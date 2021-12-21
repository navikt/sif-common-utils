import { DateDurationMap, ISODateToDate } from '..';
import {
    cleanupDateDurationMap,
    durationPerDayIsSame,
    getChangedDateDurations,
    getDatesWithDurationInDateRange,
    getNumberOfDatesWithDurationLongerThanZero,
    summarizeDateDurationMap,
    summarizeDurationWeekDays,
} from '../dateDurationUtils';

describe('dateDurationUtils', () => {
    describe('cleanupDateDurationMap', () => {
        it('removes duration which has duration with undefined hours and minutes', () => {
            const result = cleanupDateDurationMap({
                '2021-02-05': { duration: {} },
            });
            expect(Object.keys(result).length).toBe(0);
        });
        it('removes duration which has duration with invalid values in hours or minutes', () => {
            const result = cleanupDateDurationMap({
                '2021-02-05': { duration: { hours: 'a', minutes: '0' } },
            });
            expect(Object.keys(result).length).toBe(0);
        });
        it('does not remove duration which is valid', () => {
            expect(
                Object.keys(
                    cleanupDateDurationMap({
                        '2021-02-05': { duration: { hours: '0', minutes: '0' } },
                    })
                ).length
            ).toBe(1);
            expect(
                Object.keys(
                    cleanupDateDurationMap({
                        '2021-02-05': { duration: { hours: '', minutes: '0' } },
                    })
                ).length
            ).toBe(1);
            expect(
                Object.keys(
                    cleanupDateDurationMap({
                        '2021-02-05': { duration: { hours: '1' } },
                    })
                ).length
            ).toBe(1);
        });
    });
    describe('summarizeDurationWeekDays', () => {
        it('sum hours correctly', () => {
            const sum = summarizeDurationWeekDays({
                monday: { hours: '1', minutes: '0' },
                tuesday: { hours: '1', minutes: '0' },
                wednesday: { hours: '1', minutes: '0' },
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '1', minutes: '0' },
            });
            expect(sum.hours).toBe(5);
            expect(sum.minutes).toBe(0);
        });
        it('sum hours and minutes correctly', () => {
            const sum = summarizeDurationWeekDays({
                monday: { hours: '1', minutes: '5' },
                tuesday: { hours: '1', minutes: '5' },
                wednesday: { hours: '1', minutes: '5' },
                thursday: { hours: '1', minutes: '5' },
                friday: { hours: '1', minutes: '10' },
            });
            expect(sum.hours).toBe(5);
            expect(sum.minutes).toBe(30);
        });
    });
    describe('summarizeDateDurationMap', () => {
        it('sums correctly', () => {
            const result = summarizeDateDurationMap({
                '2021-01-01': { duration: { hours: '1', minutes: '2' } },
                '2021-01-02': { duration: { hours: '1', minutes: '2' } },
                '2021-01-03': { duration: { hours: '1', minutes: '2' } },
                '2021-01-04': { duration: { hours: '1', minutes: '2' } },
                '2021-01-05': { duration: { hours: '1', minutes: '2' } },
            });
            expect(result.hours).toBe(5);
            expect(result.minutes).toBe(10);
        });
    });

    describe('getNumberOfDatesWithDurationLongerThanZero', () => {
        it('includes date with minutes', () => {
            expect(getNumberOfDatesWithDurationLongerThanZero({ '2021-01-01': { duration: { minutes: '2' } } })).toBe(
                1
            );
        });
        it('includes date with hours', () => {
            expect(getNumberOfDatesWithDurationLongerThanZero({ '2021-01-01': { duration: { hours: '1' } } })).toBe(1);
        });
        it('excludes date with 0 minutes and 0 hours', () => {
            expect(
                getNumberOfDatesWithDurationLongerThanZero({ '2021-01-01': { duration: { hours: '0', minutes: '0' } } })
            ).toBe(0);
        });
        it('excludes date with invalid duration', () => {
            expect(
                getNumberOfDatesWithDurationLongerThanZero({ '2021-01-01': { duration: { hours: 'a', minutes: '0' } } })
            ).toBe(0);
            expect(
                getNumberOfDatesWithDurationLongerThanZero({ '2021-01-01': { duration: { hours: '0', minutes: 'a' } } })
            ).toBe(0);
            expect(
                getNumberOfDatesWithDurationLongerThanZero({
                    '2021-01-01': { duration: { hours: undefined, minutes: undefined } },
                })
            ).toBe(0);
        });
    });
    describe('getChangedDateDurations', () => {
        it('removes equal values', () => {
            const result = getChangedDateDurations(
                { '2021-01-01': { duration: { hours: '1', minutes: '2' } } },
                { '2021-01-01': { duration: { hours: '1', minutes: '2' } } }
            );
            expect(Object.keys(result).length).toBe(0);
        });
        it('returns changed values', () => {
            const result = getChangedDateDurations(
                { '2021-01-01': { duration: { hours: '1', minutes: '2' } } },
                { '2021-01-01': { duration: { hours: '2', minutes: '2' } } }
            );
            expect(Object.keys(result).length).toBe(1);
        });
        it('returns new values', () => {
            const result = getChangedDateDurations({ '2021-01-01': { duration: { hours: '1', minutes: '2' } } }, {});
            expect(Object.keys(result).length).toBe(1);
        });
    });
    describe('durationPerDayIsSame', () => {
        it('returns true when durations is the same', () => {
            expect(
                durationPerDayIsSame(
                    { duration: { hours: '0', minutes: '1' } },
                    { duration: { hours: '0', minutes: '1' } }
                )
            ).toBeTruthy();
        });
        it('returns true when percentage is the same', () => {
            expect(
                durationPerDayIsSame(
                    { percentage: 100, duration: { hours: '0', minutes: '1' } },
                    { percentage: 100, duration: { hours: '0', minutes: '1' } }
                )
            ).toBeTruthy();
        });
        it('returns false when percentage is not the same', () => {
            expect(
                durationPerDayIsSame(
                    { percentage: 100, duration: { hours: '0', minutes: '1' } },
                    { percentage: 99, duration: { hours: '0', minutes: '1' } }
                )
            ).toBeFalsy();
        });
    });
    describe('getDatesWithDurationInDateRange', () => {
        const data: DateDurationMap = {
            '2021-01-01': { duration: { hours: '1', minutes: '2' } },
            '2021-01-02': { duration: { hours: '1', minutes: '2' } },
            '2021-01-03': { duration: { hours: '1', minutes: '2' } },
            '2021-01-04': { duration: { hours: '1', minutes: '2' } },
            '2021-01-05': { duration: { hours: '1', minutes: '2' } },
        };

        it('returns only dates within the date range', () => {
            const result = getDatesWithDurationInDateRange(data, {
                from: ISODateToDate('2021-01-02'),
                to: ISODateToDate('2021-01-03'),
            });
            expect(Object.keys(result).length).toBe(2);
            expect(result['2021-01-02']).toBeDefined();
            expect(result['2021-01-03']).toBeDefined();
        });
    });
});
