import {
    DateRange,
    dateRangesCollide,
    datesCollideWithDateRanges,
    dateToISODate,
    isDateRange,
    ISODateToDate,
    sortDateRange,
    sortDateRangeByToDate,
} from '..';
import { getDatesInMonthOutsideDateRange, getNumberOfDaysInDateRange, getWeeksInDateRange } from '../dateRangeUtils';

describe('dateRangeUtils', () => {
    const from: Date = ISODateToDate('2020-01-01');
    const to: Date = ISODateToDate('2020-01-02');

    describe('isDateRange', () => {
        it('returns false when not DateRange', () => {
            expect(isDateRange({ from: undefined, to })).toBeFalsy();
            expect(isDateRange({ from, to: undefined })).toBeFalsy();
            expect(isDateRange({ from: undefined, to: undefined })).toBeFalsy();
        });
        it('returns true when it is a DateRange', () => {
            const from: Date = ISODateToDate('2020-01-1');
            const to: Date = ISODateToDate('2020-01-1');
            expect(isDateRange({ from, to })).toBeTruthy();
        });
    });
    describe('sortDateRange', () => {
        const dateRange1: DateRange = {
            from: ISODateToDate('2020-01-01'),
            to: ISODateToDate('2020-01-02'),
        };
        const dateRange2: DateRange = {
            from: ISODateToDate('2020-02-01'),
            to: ISODateToDate('2020-02-02'),
        };
        it('sorts correctly by from-date', () => {
            expect(sortDateRange(dateRange1, dateRange2)).toEqual(-1);
            expect(sortDateRange(dateRange1, dateRange1)).toEqual(-1);
            expect(sortDateRange(dateRange2, dateRange1)).toEqual(1);
        });
    });
    describe('sortDateRangeByToDate', () => {
        const dateRange1: DateRange = {
            from: ISODateToDate('2020-02-01'),
            to: ISODateToDate('2020-02-05'),
        };
        const dateRange2: DateRange = {
            from: ISODateToDate('2020-02-01'),
            to: ISODateToDate('2020-02-02'),
        };
        it('sorts correctly by to-date', () => {
            expect(sortDateRangeByToDate(dateRange1, dateRange2)).toEqual(1);
            expect(sortDateRangeByToDate(dateRange1, dateRange1)).toEqual(-1);
            expect(sortDateRangeByToDate(dateRange2, dateRange1)).toEqual(-1);
        });
    });
    describe('dateRangesCollide', () => {
        const dateRange1: DateRange = {
            from: ISODateToDate('2020-02-01'),
            to: ISODateToDate('2020-02-02'),
        };
        const dateRange2: DateRange = {
            from: ISODateToDate('2020-02-03'),
            to: ISODateToDate('2020-02-04'),
        };
        const dateRange3: DateRange = {
            from: ISODateToDate('2020-02-2'),
            to: ISODateToDate('2020-02-03'),
        };
        it('detects colliding date ranges', () => {
            expect(dateRangesCollide([dateRange1, dateRange2, dateRange3])).toBeTruthy();
            expect(dateRangesCollide([dateRange1, dateRange3])).toBeTruthy();
            expect(dateRangesCollide([dateRange2, dateRange3])).toBeTruthy();
        });
        it('ignores non colliding date ranges', () => {
            expect(dateRangesCollide([dateRange1, dateRange2])).toBeFalsy();
        });
        it('allows last-date and from-date be same date between ranges if specified', () => {
            expect(dateRangesCollide([dateRange1, dateRange3], true)).toBeFalsy();
        });
        it('detects collision when last-date and from-date is same date, and not set to be allowed', () => {
            expect(dateRangesCollide([dateRange1, dateRange3], false)).toBeTruthy();
        });
    });
    describe('datesCollideWithDateRanges', () => {
        const dateBefore = ISODateToDate('2020-02-01');
        const dateBetween = ISODateToDate('2020-02-04');
        const dateAfter = ISODateToDate('2020-02-07');
        const dateInside1 = ISODateToDate('2020-02-02');
        const dateInside2 = ISODateToDate('2020-02-05');
        const dateRange1: DateRange = {
            from: ISODateToDate('2020-02-02'),
            to: ISODateToDate('2020-02-03'),
        };
        const dateRange2: DateRange = {
            from: ISODateToDate('2020-02-05'),
            to: ISODateToDate('2020-02-06'),
        };
        it('returns false when no date ranges defined', () => {
            expect(datesCollideWithDateRanges([dateBefore], [])).toBeFalsy();
        });
        it('detects no collision when dates is outside date ranges', () => {
            expect(
                datesCollideWithDateRanges([dateBefore, dateBetween, dateAfter], [dateRange1, dateRange2])
            ).toBeFalsy();
        });
        it('detects collision when dates is inside one of the date ranges', () => {
            expect(datesCollideWithDateRanges([dateInside1, dateBefore], [dateRange1, dateRange2])).toBeTruthy();
            expect(datesCollideWithDateRanges([dateInside2, dateBefore], [dateRange1, dateRange2])).toBeTruthy();
        });
    });
    describe('dateIsWithinMaybeDateRange', () => {});
    describe('getWeeksInDateRange', () => {
        it('returnerer 1 når det perioden er innenfor én uke', () => {
            const dateRange: DateRange = {
                from: ISODateToDate('2021-01-04'),
                to: ISODateToDate('2021-01-10'),
            };
            const result = getWeeksInDateRange(dateRange);
            expect(getWeeksInDateRange(dateRange).length).toBe(1);
            expect(dateToISODate(result[0].from)).toEqual('2021-01-04');
            expect(dateToISODate(result[0].to)).toEqual('2021-01-10');
        });
        it('returnerer 2 når det daperioden er søndag til påfølgende søndag', () => {
            const dateRange: DateRange = {
                from: ISODateToDate('2021-01-03'),
                to: ISODateToDate('2021-01-10'),
            };
            const result = getWeeksInDateRange(dateRange);
            expect(getWeeksInDateRange(dateRange).length).toBe(2);
            expect(dateToISODate(result[0].from)).toEqual('2021-01-03');
            expect(dateToISODate(result[0].to)).toEqual('2021-01-03');
            expect(dateToISODate(result[1].from)).toEqual('2021-01-04');
            expect(dateToISODate(result[1].to)).toEqual('2021-01-10');
        });
        it('returnerer 3 når det perioden er søndag til påfølgende søndag', () => {
            const dateRange: DateRange = {
                from: ISODateToDate('2021-01-03'),
                to: ISODateToDate('2021-01-11'),
            };
            const result = getWeeksInDateRange(dateRange);
            expect(getWeeksInDateRange(dateRange).length).toBe(3);
            expect(dateToISODate(result[0].from)).toEqual('2021-01-03');
            expect(dateToISODate(result[0].to)).toEqual('2021-01-03');
            expect(dateToISODate(result[1].from)).toEqual('2021-01-04');
            expect(dateToISODate(result[1].to)).toEqual('2021-01-10');
            expect(dateToISODate(result[2].from)).toEqual('2021-01-11');
            expect(dateToISODate(result[2].to)).toEqual('2021-01-11');
        });
    });
    describe('getNumberOfDaysInDateRange', () => {
        describe('Når en teller med helgedager', () => {
            it('returnerer 1 når det er samme fra og til dato', () => {
                const result = getNumberOfDaysInDateRange({
                    from: ISODateToDate('2021-02-01'),
                    to: ISODateToDate('2021-02-01'),
                });
                expect(result).toBe(1);
            });
            it('returnerer 2 når til-dato er dagen etter fra-dato', () => {
                const result = getNumberOfDaysInDateRange({
                    from: ISODateToDate('2021-02-01'),
                    to: ISODateToDate('2021-02-02'),
                });
                expect(result).toBe(2);
            });
            it('returnerer 3 når til-dato er to dager etter fra-dato', () => {
                const result = getNumberOfDaysInDateRange({
                    from: ISODateToDate('2021-02-01'),
                    to: ISODateToDate('2021-02-03'),
                });
                expect(result).toBe(3);
            });
        });
        describe('når en ekskluderer helgedager', () => {
            it('returnerer 1 når det er fredag + helg', () => {
                const result = getNumberOfDaysInDateRange(
                    {
                        from: ISODateToDate('2021-02-05'),
                        to: ISODateToDate('2021-02-06'),
                    },
                    true
                );
                const result2 = getNumberOfDaysInDateRange(
                    {
                        from: ISODateToDate('2021-02-05'),
                        to: ISODateToDate('2021-02-07'),
                    },
                    true
                );
                expect(result).toBe(1);
                expect(result2).toBe(1);
            });
            it('returnerer 2 når det er fredag + helg + mandag', () => {
                const result = getNumberOfDaysInDateRange(
                    {
                        from: ISODateToDate('2021-02-05'),
                        to: ISODateToDate('2021-02-08'),
                    },
                    true
                );
                expect(result).toBe(2);
            });
        });
    });
    describe('getDatesInMonthOutsideDateRange', () => {
        it('returnerer alle dager i måned før fra-dato i periode', () => {
            const result = getDatesInMonthOutsideDateRange(ISODateToDate('2021-01-01'), {
                from: ISODateToDate('2021-01-04'),
                to: ISODateToDate('2021-01-31'),
            });
            expect(dateToISODate(result[0])).toEqual('2021-01-01');
            expect(dateToISODate(result[1])).toEqual('2021-01-02');
            expect(dateToISODate(result[2])).toEqual('2021-01-03');
        });
        it('returnerer alle dager i måned etter til-dato i periode', () => {
            const result = getDatesInMonthOutsideDateRange(ISODateToDate('2021-01-01'), {
                from: ISODateToDate('2021-01-01'),
                to: ISODateToDate('2021-01-28'),
            });
            expect(dateToISODate(result[0])).toEqual('2021-01-29');
            expect(dateToISODate(result[1])).toEqual('2021-01-30');
            expect(dateToISODate(result[2])).toEqual('2021-01-31');
        });
        it('returnerer alle dager i måned etter til-dato i periode når perioden er kun den første dagen i måneden', () => {
            const result = getDatesInMonthOutsideDateRange(ISODateToDate('2021-01-01'), {
                from: ISODateToDate('2021-01-01'),
                to: ISODateToDate('2021-01-01'),
            });
            expect(dateToISODate(result[0])).toEqual('2021-01-02');
        });
    });
});
