import { Duration, DurationWeekdays, summarizeDurations } from '.';

export const summarizeDurationWeekDays = (weekdays: DurationWeekdays): Duration => {
    return summarizeDurations([
        weekdays.monday,
        weekdays.tuesday,
        weekdays.wednesday,
        weekdays.thursday,
        weekdays.friday,
    ]);
};
