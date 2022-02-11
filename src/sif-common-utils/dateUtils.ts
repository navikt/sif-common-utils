import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { DateRange, getWeeksInDateRange, ISODate } from '.';
import { getDatesInDateRange, getMonthDateRange } from './dateRangeUtils';

dayjs.extend(utc);
dayjs.extend(isoWeek);

const ISODateFormat = 'YYYY-MM-DD';

export const dateToday = new Date();

export const dateToISODate = (date: Date): ISODate => dayjs.utc(date).format(ISODateFormat);

export const ISODateToDate = (isoDate: ISODate): Date => {
    return new Date(isoDate);
};

export const getISOWeekdayFromISODate = (isoDate: ISODate): number => {
    return dayjs.utc(ISODateToDate(isoDate)).isoWeekday();
};

export const getDatesInMonth = (month: Date, onlyWeekDays = false): Date[] => {
    return getDatesInDateRange(getMonthDateRange(month, onlyWeekDays), onlyWeekDays);
};

export const getFirstWeekDayInMonth = (month: Date): Date => {
    const firstDay = dayjs.utc(month).startOf('month');
    if (firstDay.isoWeekday() > 5) {
        return firstDay.add(8 - firstDay.isoWeekday(), 'days').toDate();
    }
    return firstDay.toDate();
};

export const getWeekFromDate = (date: Date, withinSameMonth = false): DateRange => {
    const from = dayjs.utc(date).startOf('isoWeek').toDate();
    const to = dayjs.utc(date).endOf('isoWeek').toDate();

    if (withinSameMonth === false || (dayjs.utc(date).isSame(from, 'month') && dayjs.utc(date).isSame(to, 'month'))) {
        return {
            from,
            to,
        };
    }
    return {
        from: getLastOfTwoDates(from, dayjs.utc(date).startOf('month').toDate()),
        to: getFirstOfTwoDates(to, dayjs.utc(date).endOf('month').toDate()),
    };
};

export const getLastWeekDayInMonth = (month: Date): Date => {
    return getLastWeekdayOnOrBeforeDate(dayjs.utc(month).endOf('month').toDate());
};

export const getLastWeekdayOnOrBeforeDate = (date: Date): Date => {
    const isoWeekDay = dayjs.utc(date).isoWeekday();
    return isoWeekDay <= 5 ? date : dayjs.utc(date).startOf('isoWeek').add(4, 'days').toDate();
};
export const getFirstWeekdayOnOrAfterDate = (date: Date): Date => {
    const isoWeekDay = dayjs.utc(date).isoWeekday();
    return isoWeekDay <= 5 ? date : dayjs.utc(date).endOf('isoWeek').add(1, 'days').toDate();
};

export const getWeeksInMonth = (month: Date, includeWholeWeeks = false): DateRange[] => {
    const range = getMonthDateRange(month);
    return getWeeksInDateRange({
        from:
            includeWholeWeeks === false
                ? range.from
                : getFirstOfTwoDates(range.from, dayjs.utc(range.from).startOf('isoWeek').toDate()),
        to:
            includeWholeWeeks === false
                ? range.to
                : getLastOfTwoDates(range.to, dayjs.utc(range.to).endOf('isoWeek').toDate()),
    });
};

export const isDateWeekDay = (date: Date): boolean => {
    return dayjs.utc(date).isoWeekday() <= 5;
};

export const isDateInDates = (date: Date, dates?: Date[]): boolean => {
    if (!dates) {
        return false;
    }
    return dates.some((d) => dayjs.utc(date).isSame(d, 'day'));
};

export const getYearMonthKey = (date: Date): string => dayjs.utc(date).format('YYYY-MM');

export const getFirstOfTwoDates = (date1: Date, date2: Date): Date => {
    return dayjs.utc(date1).isAfter(date2, 'day') ? date2 : date1;
};

export const getLastOfTwoDates = (date1: Date, date2: Date): Date => {
    return dayjs.utc(date1).isBefore(date2, 'day') ? date2 : date1;
};

export const dateUtils = {
    dateToday,
    dateToISODate,
    getDatesInMonth,
    getFirstOfTwoDates,
    getFirstWeekDayInMonth,
    getLastOfTwoDates,
    getISOWeekdayFromISODate,
    getLastWeekDayInMonth,
    getYearMonthKey,
    isDateInDates,
    isDateWeekDay,
    ISODateToDate,
};
