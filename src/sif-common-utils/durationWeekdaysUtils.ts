import { NumberDuration, DurationWeekdays, summarizeDurations, Duration } from '.';
import {
    decimalDurationToDuration,
    durationIsGreatherThanZero,
    durationToDecimalDuration,
    durationToISODuration,
    getPercentageOfDuration,
} from './durationUtils';
import { ISODurationWeekdays, Weekday } from './types';

export const summarizeDurationInDurationWeekdays = (weekdays: DurationWeekdays): NumberDuration => {
    return summarizeDurations([
        weekdays.monday,
        weekdays.tuesday,
        weekdays.wednesday,
        weekdays.thursday,
        weekdays.friday,
    ]);
};

export const getDurationForISOWeekday = (durationWeekdays: DurationWeekdays, weekday: number): Duration | undefined => {
    switch (weekday) {
        case 1:
            return durationWeekdays.monday;
        case 2:
            return durationWeekdays.tuesday;
        case 3:
            return durationWeekdays.wednesday;
        case 4:
            return durationWeekdays.thursday;
        case 5:
            return durationWeekdays.friday;
    }
    return undefined;
};

export const durationWeekdaysToISODurationWeekdays = ({
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
}: DurationWeekdays): ISODurationWeekdays => {
    return {
        monday: monday ? durationToISODuration(monday) : undefined,
        tuesday: tuesday ? durationToISODuration(tuesday) : undefined,
        wednesday: wednesday ? durationToISODuration(wednesday) : undefined,
        thursday: thursday ? durationToISODuration(thursday) : undefined,
        friday: friday ? durationToISODuration(friday) : undefined,
    };
};

const allWeekdays: Weekday[] = [Weekday.monday, Weekday.tuesday, Weekday.wednesday, Weekday.thursday, Weekday.friday];

export const getPercentageOfDurationWeekdays = (percentage: number, weekdays: DurationWeekdays): DurationWeekdays => ({
    monday: weekdays.monday ? getPercentageOfDuration(weekdays.monday, percentage) : undefined,
    tuesday: weekdays.tuesday ? getPercentageOfDuration(weekdays.tuesday, percentage) : undefined,
    wednesday: weekdays.wednesday ? getPercentageOfDuration(weekdays.wednesday, percentage) : undefined,
    thursday: weekdays.thursday ? getPercentageOfDuration(weekdays.thursday, percentage) : undefined,
    friday: weekdays.friday ? getPercentageOfDuration(weekdays.friday, percentage) : undefined,
});

export const durationWeekdaysFromHoursPerWeek = (timer: number): DurationWeekdays => {
    const tidPerDag = decimalDurationToDuration(timer / 5);
    return {
        monday: tidPerDag,
        tuesday: tidPerDag,
        wednesday: tidPerDag,
        thursday: tidPerDag,
        friday: tidPerDag,
    };
};

export const getWeekdaysWithDuration = (durationWeekdays: DurationWeekdays): Weekday[] => {
    return Object.keys(durationWeekdays)
        .filter((key) => {
            const duration = durationWeekdays[key as Weekday];
            return duration ? durationToDecimalDuration(duration) > 0 : false;
        })
        .map((key) => key as Weekday);
};

/**
 *
 * @param durationWeekdays
 * @returns alle dager i uken som er undefined eller har 0 i varighet
 */
export const getAllWeekdaysWithoutDuration = (durationWeekdays: DurationWeekdays): Weekday[] => {
    const days: Weekday[] = [];
    allWeekdays.forEach((weekday) => {
        if (durationIsGreatherThanZero(durationWeekdays[weekday]) === false) {
            days.push(weekday);
        }
    });
    return days;
};

export const hasWeekdaysWithoutDuration = (durationWeekdays: DurationWeekdays): boolean =>
    allWeekdays.some((weekday) => durationIsGreatherThanZero(durationWeekdays[weekday]) === false);

export const removeDurationWeekdaysNotInDurationWeekdays = (
    weekdays1: DurationWeekdays,
    weekdays2: DurationWeekdays
): DurationWeekdays => {
    return {
        [Weekday.monday]: weekdays2.monday ? weekdays1.monday : undefined,
        [Weekday.tuesday]: weekdays2.tuesday ? weekdays1.tuesday : undefined,
        [Weekday.wednesday]: weekdays2.wednesday ? weekdays1.wednesday : undefined,
        [Weekday.thursday]: weekdays2.thursday ? weekdays1.thursday : undefined,
        [Weekday.friday]: weekdays2.friday ? weekdays1.friday : undefined,
    };
};

const getDurationOrUndefinedIfNoDuration = (duration?: Duration): Duration | undefined =>
    duration === undefined || durationIsGreatherThanZero(duration) === false ? undefined : duration;

export const removeDurationWeekdaysWithNoDuration = ({
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
}: DurationWeekdays): DurationWeekdays => {
    return {
        [Weekday.monday]: getDurationOrUndefinedIfNoDuration(monday),
        [Weekday.tuesday]: getDurationOrUndefinedIfNoDuration(tuesday),
        [Weekday.wednesday]: getDurationOrUndefinedIfNoDuration(wednesday),
        [Weekday.thursday]: getDurationOrUndefinedIfNoDuration(thursday),
        [Weekday.friday]: getDurationOrUndefinedIfNoDuration(friday),
    };
};
