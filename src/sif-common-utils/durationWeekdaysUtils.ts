import { NumberDuration, DurationWeekdays, summarizeDurations } from '.';

export const summarizeDurationWeekDays = (weekdays: DurationWeekdays): NumberDuration => {
    return summarizeDurations([
        weekdays.monday,
        weekdays.tuesday,
        weekdays.wednesday,
        weekdays.thursday,
        weekdays.friday,
    ]);
};
