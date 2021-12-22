import {
    DateDurationMap,
    DateRange,
    NumberDuration,
    durationIsZero,
    durationsAreEqual,
    ensureDurationIgnoreInvalid,
    ensureDateDuration,
    isDateInDateRange,
    ISODate,
    ISODateToDate,
    isValidDuration,
    summarizeDurations,
} from '.';

export const getValidDateDurations = (durationMap: DateDurationMap): DateDurationMap => {
    const cleanMap: DateDurationMap = {};
    Object.keys(durationMap).forEach((key) => {
        const duration = durationMap[key];
        if (isValidDuration(duration)) {
            cleanMap[key] = { ...duration };
        }
    });
    return cleanMap;
};

export const summarizeDateDurationMap = (durationMap: DateDurationMap): NumberDuration => {
    const durations = Object.keys(durationMap).map((key) => ensureDurationIgnoreInvalid(durationMap[key]));
    return summarizeDurations(durations);
};

export const getDatesWithDurationLongerThanZero = (duration: DateDurationMap): ISODate[] =>
    Object.keys(duration).filter((key) => {
        const d = duration[key];
        return isValidDuration(d) && durationIsZero(ensureDateDuration(d)) === false;
    });

/**
 * Get all dates with duration in date range
 * @param dateDurationMap
 * @param dateRange
 * @returns
 */
export const getDateDurationsInDateRange = (
    dateDurationMap: DateDurationMap,
    dateRange: DateRange,
    removeInvalidDurations = true
): DateDurationMap => {
    const dateDuration: DateDurationMap = {};
    Object.keys(dateDurationMap).forEach((isoDate) => {
        const date = ISODateToDate(isoDate);
        if (date && isDateInDateRange(date, dateRange)) {
            if (removeInvalidDurations && isValidDuration(dateDurationMap[isoDate]) === false) {
                return;
            }
            dateDuration[isoDate] = dateDurationMap[isoDate];
        }
        return false;
    });
    return dateDuration;
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
        if (oldValue && durationsAreEqual(durations1[isoDate], oldValue)) {
            return;
        }
        resultMap[isoDate] = durations1[isoDate];
    });
    return resultMap;
};
