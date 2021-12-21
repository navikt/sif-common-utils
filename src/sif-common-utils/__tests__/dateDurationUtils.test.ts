import {
    ISODateToDate,
    getValidDateDurations,
    summarizeDateDurationMap,
    getDatesWithDurationLongerThanZero,
    getDateDurationDiff,
    getValidDateDurationInDateRange,
    DateDurationMap,
} from '..';

describe('dateDurationUtils', () => {
    describe('removeInvalidDurations', () => {
        it('removes duration which has duration with undefined hours and minutes', () => {
            const result = getValidDateDurations({
                '2021-02-05': { hours: undefined, minutes: undefined },
            });
            expect(Object.keys(result).length).toBe(0);
        });
        it('removes duration which has duration with invalid values in hours or minutes', () => {
            const result = getValidDateDurations({
                '2021-02-05': { hours: 'a', minutes: '0' },
            });
            expect(Object.keys(result).length).toBe(0);
        });
        it('does not remove duration which is valid', () => {
            expect(
                Object.keys(
                    getValidDateDurations({
                        '2021-02-05': { hours: '0', minutes: '0' },
                    })
                ).length
            ).toBe(1);
            expect(
                Object.keys(
                    getValidDateDurations({
                        '2021-02-05': { hours: '', minutes: '0' },
                    })
                ).length
            ).toBe(1);
            expect(
                Object.keys(
                    getValidDateDurations({
                        '2021-02-05': { hours: '1' },
                    })
                ).length
            ).toBe(1);
        });
    });

    describe('summarizeDateDurationMap', () => {
        it('sums correctly', () => {
            const result = summarizeDateDurationMap({
                '2021-01-01': { hours: '1', minutes: '2' },
                '2021-01-02': { hours: '1', minutes: '2' },
                '2021-01-03': { hours: '1', minutes: '2' },
                '2021-01-04': { hours: '1', minutes: '2' },
                '2021-01-05': { hours: '1', minutes: '2' },
            });
            expect(result.hours).toBe(5);
            expect(result.minutes).toBe(10);
        });
    });

    describe('getDatesWithDurationLongerThanZero', () => {
        it('includes date with minutes', () => {
            expect(getDatesWithDurationLongerThanZero({ '2021-01-01': { minutes: '2' } }).length).toBe(1);
        });
        it('includes date with hours', () => {
            expect(getDatesWithDurationLongerThanZero({ '2021-01-01': { hours: '1' } }).length).toBe(1);
        });
        it('excludes date with 0 minutes and 0 hours', () => {
            expect(getDatesWithDurationLongerThanZero({ '2021-01-01': { hours: '0', minutes: '0' } }).length).toBe(0);
        });
        it('excludes date with invalid duration', () => {
            expect(getDatesWithDurationLongerThanZero({ '2021-01-01': { hours: 'a', minutes: '0' } }).length).toBe(0);
            expect(getDatesWithDurationLongerThanZero({ '2021-01-01': { hours: '0', minutes: 'a' } }).length).toBe(0);
            expect(
                getDatesWithDurationLongerThanZero({
                    '2021-01-01': { hours: undefined, minutes: undefined },
                }).length
            ).toBe(0);
        });
    });
    describe('getDateDurationDiff', () => {
        it('removes equal values', () => {
            const result = getDateDurationDiff(
                { '2021-01-01': { hours: '1', minutes: '2' } },
                { '2021-01-01': { hours: '1', minutes: '2' } }
            );
            expect(Object.keys(result).length).toBe(0);
        });
        it('returns changed values', () => {
            const result = getDateDurationDiff(
                { '2021-01-01': { hours: '1', minutes: '2' } },
                { '2021-01-01': { hours: '2', minutes: '2' } }
            );
            expect(Object.keys(result).length).toBe(1);
        });
        it('returns new values', () => {
            const result = getDateDurationDiff({ '2021-01-01': { hours: '1', minutes: '2' } }, {});
            expect(Object.keys(result).length).toBe(1);
        });
    });

    describe('getValidDateDurationInDateRange', () => {
        const data: DateDurationMap = {
            '2021-01-01': { hours: '1', minutes: '2' },
            '2021-01-02': { hours: '1', minutes: '2' },
            '2021-01-03': { hours: '1', minutes: '2' },
            '2021-01-04': { hours: '1', minutes: '2' },
            '2021-01-05': { hours: '1', minutes: '2' },
        };

        it('returns only dates within the date range', () => {
            const result = getValidDateDurationInDateRange(data, {
                from: ISODateToDate('2021-01-02'),
                to: ISODateToDate('2021-01-03'),
            });
            expect(Object.keys(result).length).toBe(2);
            expect(result['2021-01-02']).toBeDefined();
            expect(result['2021-01-03']).toBeDefined();
        });
    });
});
