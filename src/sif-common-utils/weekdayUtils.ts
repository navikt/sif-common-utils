import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Weekday } from './types';

dayjs.extend(isoWeek);

export const getWeekdayFromDate = (date: Date): Weekday | undefined => {
    const dow = dayjs(date).isoWeekday();
    switch (dow) {
        case 1:
            return Weekday.monday;
        case 2:
            return Weekday.tuesday;
        case 3:
            return Weekday.wednesday;
        case 4:
            return Weekday.thursday;
        case 5:
            return Weekday.friday;
        default:
            return undefined;
    }
};
export const isDateInWeekdays = (date: Date, weekdays: Weekday[] | undefined): boolean => {
    if (!weekdays || weekdays.length === 0) {
        return false;
    }
    return weekdays.some((weekday) => weekday === getWeekdayFromDate(date));
};
