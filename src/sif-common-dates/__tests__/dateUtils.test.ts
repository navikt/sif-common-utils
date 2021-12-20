import {
    dateIsWeekDay,
    dateToISODate,
    getDatesInMonth,
    getFirstWeekDayInMonth,
    getISOWeekdayFromISODate,
    getLastWeekDayInMonth,
    isDateInDates,
    ISODateToDate,
} from '..';

describe('dateUtils', () => {
    describe('ISODateToDate', () => {
        it('converts an iso-date formatted date to Date object, utc', () => {
            const result = ISODateToDate('2021-01-01');
            expect(result.getFullYear()).toEqual(2021);
            expect(result.getMonth()).toEqual(0);
            expect(result.getDate()).toEqual(1);
        });
    });
    describe('dateToISODate', () => {
        it('converts a date to iso formatted date', () => {
            const date: Date = new Date(Date.UTC(2021, 0, 1));
            const result = dateToISODate(date);
            expect(result).toEqual('2021-01-01');
        });
    });
    describe('getISOWeekdayFromISODate', () => {
        it('returns monday as day 1, sunday as day 7', () => {
            expect(getISOWeekdayFromISODate('2021-02-1')).toEqual(1);
            expect(getISOWeekdayFromISODate('2021-02-7')).toEqual(7);
        });
    });
    describe('getDatesInMonth', () => {
        it('returns all days of january 2021 correctly', () => {
            const dates = getDatesInMonth(ISODateToDate('2021-01-01'));
            expect(dates.length).toBe(31);
            expect(dateToISODate(dates[0])).toEqual('2021-01-01');
            expect(dateToISODate(dates[30])).toEqual('2021-01-31');
        });
        it('returns all days of february 2021 correctly', () => {
            const dates = getDatesInMonth(ISODateToDate('2021-02-01'));
            expect(dates.length).toBe(28);
            expect(dateToISODate(dates[0])).toEqual('2021-02-01');
            expect(dateToISODate(dates[27])).toEqual('2021-02-28');
        });
    });
    describe('getFirstWeekDayInMonth', () => {
        it('returns correct weekday if first day of month is a monday - 1. january 2020', () => {
            const result = getFirstWeekDayInMonth(ISODateToDate('2020-01-01'));
            expect(dateToISODate(result)).toEqual('2020-01-01');
        });
        it('returns correct weekday if first day of month is a friday - 1. may 2020', () => {
            const result = getFirstWeekDayInMonth(ISODateToDate('2020-05-01'));
            expect(dateToISODate(result)).toEqual('2020-05-01');
        });
        it('returns correct weekday if first day of month is a saturday - 1. february 2020', () => {
            const result = getFirstWeekDayInMonth(ISODateToDate('2020-02-01'));
            expect(dateToISODate(result)).toEqual('2020-02-03');
        });
        it('returns correct weekday if first day of month is a sunday - 1. march 2020', () => {
            const result = getFirstWeekDayInMonth(ISODateToDate('2020-03-01'));
            expect(dateToISODate(result)).toEqual('2020-03-02');
        });
    });
    describe('getLastWeekDayInMonth', () => {
        it('returns correct weekday if first day of month is a monday - 31. august 2020', () => {
            const result = getLastWeekDayInMonth(ISODateToDate('2020-08-01'));
            expect(dateToISODate(result)).toEqual('2020-08-31');
        });
        it('returns correct weekday if last day of month is a friday - 31. january 2020', () => {
            const result = getLastWeekDayInMonth(ISODateToDate('2020-01-01'));
            expect(dateToISODate(result)).toEqual('2020-01-31');
        });
        it('returns correct weekday if last day of month is a saturday - 1. february 2020', () => {
            const result = getLastWeekDayInMonth(ISODateToDate('2020-02-01'));
            expect(dateToISODate(result)).toEqual('2020-02-28');
        });
        it('returns correct weekday if last day of month is a sunday - 31. may 2020', () => {
            const result = getLastWeekDayInMonth(ISODateToDate('2020-05-01'));
            expect(dateToISODate(result)).toEqual('2020-05-29');
        });
    });
    describe('dateIsWeekDay', () => {
        it('mon-fri is weekday, sat-sun is not', () => {
            expect(dateIsWeekDay(ISODateToDate('2020-01-06'))).toBeTruthy();
            expect(dateIsWeekDay(ISODateToDate('2020-01-07'))).toBeTruthy();
            expect(dateIsWeekDay(ISODateToDate('2020-01-08'))).toBeTruthy();
            expect(dateIsWeekDay(ISODateToDate('2020-01-09'))).toBeTruthy();
            expect(dateIsWeekDay(ISODateToDate('2020-01-10'))).toBeTruthy();
            expect(dateIsWeekDay(ISODateToDate('2020-01-11'))).toBeFalsy();
            expect(dateIsWeekDay(ISODateToDate('2020-01-12'))).toBeFalsy();
        });
    });
    describe('isDateInDates', () => {
        const dateInDates = ISODateToDate('2020-01-01');
        const dateNotInDates = ISODateToDate('2020-12-12');
        const dates: Date[] = [dateInDates, ISODateToDate('2020-01-02')];
        it('returns true if date exists in dates[]', () => {
            expect(isDateInDates(dateInDates, dates)).toBeTruthy();
        });
        it('returns false if date does not exist in dates[]', () => {
            expect(isDateInDates(dateNotInDates, dates)).toBeFalsy();
        });
    });
});
