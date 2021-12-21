import {
    DateDurationMap,
    DateRange,
    Duration,
    durationIsZero,
    durationsAreSame,
    ensureDurationIgnoreInvalid,
    ensureInputDuration,
    isDateInDateRange,
    ISODate,
    ISODateToDate,
    isValidDuration,
    summarizeDurations,
} from '.';

export const getValidDateDurations = (workDurationMap: DateDurationMap): DateDurationMap => {
    const cleanMap: DateDurationMap = {};
    Object.keys(workDurationMap).forEach((key) => {
        const duration = workDurationMap[key];
        if (isValidDuration(duration)) {
            cleanMap[key] = { ...duration };
        }
    });
    return cleanMap;
};

export const summarizeDateDurationMap = (workDuration: DateDurationMap): Duration => {
    const durations = Object.keys(workDuration).map((key) => ensureDurationIgnoreInvalid(workDuration[key]));
    return summarizeDurations(durations);
};

export const getDatesWithDurationLongerThanZero = (duration: DateDurationMap): ISODate[] =>
    Object.keys(duration).filter((key) => {
        const d = duration[key];
        return isValidDuration(d) && durationIsZero(ensureInputDuration(d)) === false;
    });

/**
 * Get all dates with duration in date range
 * @param dateDurationMap
 * @param dateRange
 * @returns
 */
export const getValidDateDurationInDateRange = (
    dateDurationMap: DateDurationMap,
    dateRange: DateRange
): DateDurationMap => {
    const validWorkInDateRange: DateDurationMap = {};
    const validWork = getValidDateDurations(dateDurationMap);
    Object.keys(validWork).forEach((isoDate) => {
        const date = ISODateToDate(isoDate);
        if (date && isDateInDateRange(date, dateRange)) {
            validWorkInDateRange[isoDate] = dateDurationMap[isoDate];
        }
        return false;
    });
    return validWorkInDateRange;
};

/**
 * Get all durations which is different in durations1 from durations2
 * @param durations1
 * @param durations2
 * @returns
 */
export const getDateDurationDiff = (durations1: DateDurationMap, durations2: DateDurationMap): DateDurationMap => {
    const resultMap: DateDurationMap = {};
    Object.keys(durations1).forEach((isoDate) => {
        const oldValue = durations2[isoDate];
        if (oldValue && durationsAreSame(durations1[isoDate], oldValue)) {
            return;
        }
        resultMap[isoDate] = durations1[isoDate];
    });
    return resultMap;
};
