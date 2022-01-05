import { NumberDuration, DurationWeekdays, summarizeDurations, Duration } from '.';

export const summarizeDurationWeekDays = (weekdays: DurationWeekdays): NumberDuration => {
    return summarizeDurations([
        weekdays.monday,
        weekdays.tuesday,
        weekdays.wednesday,
        weekdays.thursday,
        weekdays.friday,
    ]);
};

export const getDurationForWeekday = (
    durationWeekdays: DurationWeekdays,
    weekday: 1 | 2 | 3 | 4 | 5
): Duration | undefined => {
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
