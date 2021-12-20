import dayjs from 'dayjs';
import {
    dateIsInDateRange,
    dateIsInsideDateRange,
    dateIsWithinMaybeDateRange,
    DateRange,
    dateRangesCollide,
    datesCollideWithDateRanges,
    dateToISODate,
    getDatesInDateRange,
    getMonthsInDateRange,
    getWeekDateRange,
    isDateRange,
    ISODateToDate,
    sortDateRange,
    sortDateRangeByToDate,
} from '..';
import { getDatesInMonthOutsideDateRange, getNumberOfDaysInDateRange, getWeeksInDateRange } from '../dateRangeUtils';

describe('dateRangeUtils', () => {
    const from: Date = ISODateToDate('2020-01-01');
    const to: Date = ISODateToDate('2020-01-03');

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
    describe('dateIsWithinMaybeDateRange', () => {
        const dateBefore = ISODateToDate('2020-01-01');
        const date = ISODateToDate('2020-01-03');
        const from = ISODateToDate('2020-01-02');
        const to = ISODateToDate('2020-01-05');

        it('returnerer true når to-date ikke er satt og dato er lik eller etter from-date', () => {
            expect(dateIsWithinMaybeDateRange(date, { from: date })).toBeTruthy();
            expect(dateIsWithinMaybeDateRange(date, { from })).toBeTruthy();
        });
        it('returnerer false når to-date ikke er satt og dato er før from-date', () => {
            expect(dateIsWithinMaybeDateRange(dateBefore, { from })).toBeFalsy();
        });
        it('returnerer true når from-date ikke er satt og dato er lik eller før to-date', () => {
            expect(dateIsWithinMaybeDateRange(date, { to: date })).toBeTruthy();
            expect(dateIsWithinMaybeDateRange(date, { to })).toBeTruthy();
        });
        it('returnerer false når from-date ikke er satt og dato er etter to-date', () => {
            expect(dateIsWithinMaybeDateRange(date, { to: from })).toBeFalsy();
        });
    });
    describe('dateIsInDateRange', () => {
        it('returnerer true når dato er lik startdato', () => {
            expect(dateIsInDateRange(from, { from, to })).toBeTruthy();
        });
        it('returnerer true når dato er lik sluttdato', () => {
            expect(dateIsInDateRange(to, { from, to })).toBeTruthy();
        });
        it('returnerer true når dato er mellom start og sluttdato', () => {
            expect(dateIsInDateRange(dayjs(from).add(1, 'day').toDate(), { from, to })).toBeTruthy();
        });
        it('returnerer false når dato er før startdato', () => {
            expect(dateIsInDateRange(dayjs(from).subtract(1, 'day').toDate(), { from, to })).toBeFalsy();
        });
        it('returnerer false når dato er etter sluttdato', () => {
            expect(dateIsInDateRange(dayjs(to).add(1, 'day').toDate(), { from, to })).toBeFalsy();
        });
    });
    describe('dateIsInsideDateRange', () => {
        it('returnerer false når dato er lik startdato', () => {
            expect(dateIsInsideDateRange(from, { from, to })).toBeFalsy();
        });
        it('returnerer false når dato er lik sluttdato', () => {
            expect(dateIsInsideDateRange(to, { from, to })).toBeFalsy();
        });
        it('returnerer true når dato er mellom start og sluttdato', () => {
            expect(dateIsInsideDateRange(dayjs(from).add(1, 'day').toDate(), { from, to })).toBeTruthy();
        });
        it('returnerer false når dato er før startdato', () => {
            expect(dateIsInsideDateRange(dayjs(from).subtract(1, 'day').toDate(), { from, to })).toBeFalsy();
        });
        it('returnerer false når dato er etter sluttdato', () => {
            expect(dateIsInsideDateRange(dayjs(to).add(1, 'day').toDate(), { from, to })).toBeFalsy();
        });
    });
    describe('getMonthsInDateRange', () => {
        const dateRange: DateRange = {
            from: ISODateToDate('2020-01-05'),
            to: ISODateToDate('2020-01-20'),
        };
        it('returnerer måned med avgrenst fra og til dato når returnFullMonths === false', () => {
            const result = getMonthsInDateRange(dateRange);
            expect(result.length).toEqual(1);
            expect(dateToISODate(result[0].from)).toEqual('2020-01-05');
            expect(dateToISODate(result[0].to)).toEqual('2020-01-20');
        });
        it('returnerer hele måneden når returnFullMonths === true', () => {
            const result = getMonthsInDateRange(dateRange, true);
            expect(result.length).toEqual(1);
            expect(dateToISODate(result[0].from)).toEqual('2020-01-01');
            expect(dateToISODate(result[0].to)).toEqual('2020-01-31');
        });
        it('returnerer riktig antall måneder når dateRange går over 15 måneder', () => {
            const from = ISODateToDate('2020-01-10');
            const to = dayjs(from).add(14, 'months').toDate();
            const result = getMonthsInDateRange({
                from,
                to,
            });
            expect(result.length).toEqual(15);
            expect(dateToISODate(result[0].from)).toEqual('2020-01-10');
            expect(dateToISODate(result[14].to)).toEqual('2021-03-10');
        });
    });
    describe('getWeekDateRange', () => {
        it('returnerer riktige datoer når onlyWeekdays === false', () => {
            const result = getWeekDateRange(ISODateToDate('2020-01-01'));
            expect(dateToISODate(result.from)).toEqual('2019-12-30');
            expect(dateToISODate(result.to)).toEqual('2020-01-05');
            expect(dayjs(result.from).isoWeekday()).toEqual(1);
            expect(dayjs(result.to).isoWeekday()).toEqual(7);
        });
        it('returnerer riktige datoer når onlyWeekdays === true', () => {
            const result = getWeekDateRange(ISODateToDate('2020-01-01'), true);
            expect(dateToISODate(result.from)).toEqual('2019-12-30');
            expect(dateToISODate(result.to)).toEqual('2020-01-03');
            expect(dayjs(result.from).isoWeekday()).toEqual(1);
            expect(dayjs(result.to).isoWeekday()).toEqual(5);
        });
    });
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
    describe('getDatesInDateRange', () => {
        it('returnerer riktige datoer når alle ukedager er med', () => {
            const result = getDatesInDateRange({
                from: ISODateToDate('2020-01-01'),
                to: ISODateToDate('2020-02-15'),
            });
            expect(result.length).toEqual(46);
            expect(dateToISODate(result[0])).toEqual('2020-01-01');
            expect(dateToISODate(result[45])).toEqual('2020-02-15');
        });
        it('returnerer riktige datoer når kun virkedager er med', () => {
            const result = getDatesInDateRange(
                {
                    from: ISODateToDate('2020-01-01'),
                    to: ISODateToDate('2020-02-15'),
                },
                true
            );
            expect(result.length).toEqual(33);
            expect(dateToISODate(result[0])).toEqual('2020-01-01');
            expect(dateToISODate(result[3])).toEqual('2020-01-06');
            expect(dateToISODate(result[32])).toEqual('2020-02-14');
        });
    });
    // describe('getYearsInDateRanges', () => {
    //     it('');
    // });
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
