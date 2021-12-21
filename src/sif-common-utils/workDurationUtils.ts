import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import {
    isDateInDateRange,
    DateRange,
    WorkDurationMap,
    durationIsZero,
    ISODateToDate,
    isValidDuration,
    WorkDuration,
    Duration,
    summarizeDurations,
    ensureDurationIgnoreInvalid,
    ensureInputDuration,
    durationToISODuration,
} from '.';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(minMax);

/**
 * Get all dates with valid duration
 * @param workDurationMap
 * @returns
 */
export const getValidWorkDurations = (workDurationMap: WorkDurationMap): WorkDurationMap => {
    const cleanMap: WorkDurationMap = {};
    Object.keys(workDurationMap).forEach((key) => {
        const workDuration = workDurationMap[key];
        if (workDuration && isValidDuration(workDuration.duration)) {
            cleanMap[key] = { ...workDuration };
        }
    });
    return cleanMap;
};

/**
 * Summarize all duration
 * @param workDuration
 * @returns
 */
export const summarizeWorkDurationMap = (workDuration: WorkDurationMap): Duration => {
    const durations = Object.keys(workDuration).map((key) => ensureDurationIgnoreInvalid(workDuration[key].duration));
    return summarizeDurations(durations);
};

/**
 * Get number of dates which has a valid duration and a duration longer than zero
 * @param workDurationMap
 * @returns
 */
export const getDatesWithWorkDurationLongerThanZero = (workDurationMap: WorkDurationMap): number =>
    Object.keys(workDurationMap).filter((key) => {
        const duration = ensureInputDuration(workDurationMap[key].duration);

        return durationIsZero(duration) === false;
    }).length;

/**
 * Get all durations which are different in durations1 from durations2
 * @param durations1
 * @param durations2
 * @returns
 */
export const getWorkDurationDiff = (durations1: WorkDurationMap, durations2: WorkDurationMap): WorkDurationMap => {
    const resultMap: WorkDurationMap = {};
    Object.keys(durations1).forEach((isoDate) => {
        const oldValue = durations2[isoDate];
        if (oldValue && workDurationsAreEqual(durations1[isoDate], oldValue)) {
            return;
        }
        resultMap[isoDate] = durations1[isoDate];
    });
    return resultMap;
};

/**
 * Get all dates with duration in date range
 * @param workDurationMap
 * @param dateRange
 * @returns WorkDurationMap
 */
export const getValidWorkDurationInDateRange = (
    workDurationMap: WorkDurationMap,
    dateRange: DateRange
): WorkDurationMap => {
    const validWorkInDateRange: WorkDurationMap = {};
    const validWork = getValidWorkDurations(workDurationMap);
    Object.keys(validWork).forEach((isoDate) => {
        const date = ISODateToDate(isoDate);
        if (date && isDateInDateRange(date, dateRange)) {
            validWorkInDateRange[isoDate] = workDurationMap[isoDate];
        }
        return false;
    });
    return validWorkInDateRange;
};

/**
 * See if durations are the same in percentage and duration
 * @param duration1
 * @param duration2
 * @returns boolean
 */
export const workDurationsAreEqual = (duration1: WorkDuration, duration2: WorkDuration): boolean => {
    if (duration1.percentage !== undefined && duration2.percentage !== undefined) {
        return duration1.percentage === duration2.percentage;
    }
    const dur1 = ensureDurationIgnoreInvalid(duration1.duration);
    const dur2 = ensureDurationIgnoreInvalid(duration2.duration);
    return durationToISODuration(dur1) === durationToISODuration(dur2);
};

// interface PeriodeMedDatoTid {
//     periode: DateRange;
//     tid: DurationPerDay;
//     datoer: ISODate[];
// }

// export const getPerioderMedLikTidIDatoTidMap = (datoTidMap: WorkDurationMap): PeriodeMedDatoTid[] => {
//     const dagerMedTid = Object.keys(datoTidMap)
//         .sort((d1, d2): number => (dayjs(ISODateToDate(d1)).isBefore(ISODateToDate(d2), 'day') ? -1 : 1))
//         .map((key, index, arr) => {
//             const forrige = index > 0 ? { dato: arr[index - 1], tid: datoTidMap[arr[index - 1]] } : undefined;
//             return {
//                 dato: ISODateToDate(key),
//                 isoDate: key,
//                 tid: datoTidMap[key],
//                 forrige,
//             };
//         })
//         .filter((dag) => (dag.tid.duration ? durationIsZero(dag.tid.duration) === false : false));

//     if (dagerMedTid.length === 0) {
//         return [];
//     }
//     if (dagerMedTid.length === 1) {
//         return [
//             {
//                 periode: {
//                     from: ISODateToDate(dagerMedTid[0].isoDate),
//                     to: ISODateToDate(dagerMedTid[0].isoDate),
//                 },
//                 tid: dagerMedTid[0].tid,
//                 datoer: [dagerMedTid[0].isoDate],
//             },
//         ];
//     }
//     const perioder: PeriodeMedDatoTid[] = [];
//     let startNyPeriode: ISODate = dagerMedTid[0].isoDate;
//     let datoerIPeriode: ISODate[] = [];
//     dagerMedTid.forEach(({ isoDate, tid, forrige }, index) => {
//         if (index > 0 && forrige) {
//             if (datoTidErLik(forrige.tid, tid)) {
//                 if (datoerIPeriode.length === 0) {
//                     datoerIPeriode.push(startNyPeriode);
//                 }
//                 datoerIPeriode.push(isoDate);
//             } else {
//                 perioder.push({
//                     periode: { from: ISODateToDate(startNyPeriode), to: ISODateToDate(forrige.dato) },
//                     tid,
//                     datoer: [...datoerIPeriode],
//                 });
//                 datoerIPeriode = [];
//                 startNyPeriode = isoDate;
//             }
//         }
//     });

//     const sisteDag = dagerMedTid[dagerMedTid.length - 1];
//     if (startNyPeriode !== sisteDag.isoDate) {
//         perioder.push({
//             periode: { from: ISODateToDate(startNyPeriode), to: ISODateToDate(sisteDag.isoDate) },
//             tid: sisteDag.tid,
//             datoer: [...datoerIPeriode],
//         });
//     }
//     return perioder;
// };
