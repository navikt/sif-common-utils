import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { ISODate } from './';
import { getDatesInDateRange, getMonthDateRange } from './dateRangeUtils';

dayjs.extend(utc);
dayjs.extend(isoWeek);

const ISODateFormat = 'YYYY-MM-DD';

const prettyDateFormat = 'DD.MM.YYYY';
const prettyDateFormatExtended = 'D. MMM YYYY';
const prettyDateFormatFull = 'D. MMMM YYYY';

export const dateToday = dayjs().toDate();

export const prettifyDate = (date: Date): string => dayjs(date).format(prettyDateFormat);
export const prettifyDateExtended = (date: Date) => dayjs(date).format(prettyDateFormatExtended);
export const prettifyDateFull = (date: Date) => dayjs(date).format(prettyDateFormatFull);

export const dateToISODate = (date: Date): ISODate => dayjs(date).format(ISODateFormat);

export const ISODateToDate = (isoDate: ISODate): Date => {
    return dayjs.utc(isoDate, ISODateFormat).toDate();
};

export const getISOWeekdayFromISODate = (isoDate: ISODate): number => {
    return dayjs(ISODateToDate(isoDate)).isoWeekday();
};

export const getDatesInMonth = (month: Date, onlyWeekDays = false): Date[] => {
    return getDatesInDateRange(getMonthDateRange(month, onlyWeekDays), onlyWeekDays);
};

export const getLastWeekDayInMonth = (month: Date): Date => {
    return dayjs(month).endOf('month').startOf('week').add(4, 'days').toDate();
};

export const getFirstWeekDayInMonth = (month: Date): Date => {
    const firstDay = dayjs(month).startOf('month');
    if (firstDay.isoWeekday() > 5) {
        return firstDay.add(8 - firstDay.isoWeekday(), 'days').toDate();
    }
    return firstDay.toDate();
};

export const isDateInDates = (date: Date, dates?: Date[]): boolean => {
    if (!dates) {
        return false;
    }
    return dates.some((d) => dayjs(date).isSame(d, 'day'));
};

export const dateIsWeekDay = (date: Date): boolean => {
    return dayjs(date).isoWeekday() <= 5;
};

export const getYearMonthKey = (date: Date): string => dayjs(date).format('YYYY-MM');
