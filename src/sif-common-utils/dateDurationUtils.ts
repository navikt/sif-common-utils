import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import {
    dateIsInDateRange,
    DateRange,
    DateDurationMap,
    durationIsZero,
    ISODateToDate,
    isValidDuration,
    DurationPerDay,
    DurationWeekdays,
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
 * Fjerner alle dager som har ugyldig tid
 * @param durationMap
 * @returns DateDurationMap
 */
export const removeInvalidDurations = (durationMap: DateDurationMap): DateDurationMap => {
    const cleanMap: DateDurationMap = {};
    Object.keys(durationMap).forEach((key) => {
        const dateDuration = durationMap[key];
        if (dateDuration && isValidDuration(dateDuration.duration)) {
            cleanMap[key] = { ...dateDuration };
        }
    });
    return cleanMap;
};

export const summarizeDurationWeekDays = (weekdays: DurationWeekdays): Duration => {
    return summarizeDurations([
        weekdays.monday,
        weekdays.tuesday,
        weekdays.wednesday,
        weekdays.thursday,
        weekdays.friday,
    ]);
};

export const summarizeDateDurationMap = (dateDuration: DateDurationMap): Duration => {
    const durations = Object.keys(dateDuration).map((key) => ensureDurationIgnoreInvalid(dateDuration[key].duration));
    return summarizeDurations(durations);
};

export const getNumberOfDatesWithDurationLongerThanZero = (dateDurationMap: DateDurationMap): number =>
    Object.keys(dateDurationMap).filter((key) => {
        const duration = ensureInputDuration(dateDurationMap[key].duration);

        return durationIsZero(duration) === false;
    }).length;

export const getChangedDateDurations = (
    newDurations: DateDurationMap,
    oldDurations: DateDurationMap
): DateDurationMap => {
    const resultMap: DateDurationMap = {};
    Object.keys(newDurations).forEach((isoDate) => {
        const oldValue = oldDurations[isoDate];
        if (oldValue && durationPerDayIsSame(newDurations[isoDate], oldValue)) {
            return;
        }
        resultMap[isoDate] = newDurations[isoDate];
    });
    return resultMap;
};

/**
 * Get all dates with duration in date range
 * @param dateDurationMap
 * @param dateRange
 * @returns DateDurationMap
 */
export const getDatesWithDurationInDateRange = (
    dateDurationMap: DateDurationMap,
    dateRange: DateRange
): DateDurationMap => {
    const resultMap: DateDurationMap = {};
    Object.keys(dateDurationMap).forEach((isoDate) => {
        const date = ISODateToDate(isoDate);
        if (date && dateIsInDateRange(date, dateRange)) {
            const duration = dateDurationMap[isoDate];
            if (duration) {
                resultMap[isoDate] = duration;
            }
        }
        return false;
    });
    return resultMap;
};

/**
 * See if durations are the same in percentage and duration
 * @param duration1
 * @param duration2
 * @returns boolean
 */
export const durationPerDayIsSame = (duration1: DurationPerDay, duration2: DurationPerDay): boolean => {
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

// export const getPerioderMedLikTidIDatoTidMap = (datoTidMap: DateDurationMap): PeriodeMedDatoTid[] => {
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
