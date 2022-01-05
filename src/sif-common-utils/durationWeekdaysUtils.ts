import { NumberDuration, DurationWeekdays, summarizeDurations, Duration } from '.';

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
