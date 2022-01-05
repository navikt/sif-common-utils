import { DurationWeekdays, getDurationForWeekday } from '..';
import { summarizeDurationWeekDays } from '../durationWeekdaysUtils';

describe('workDurationUtils', () => {
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
    describe('getDurationForWeekday', () => {
        const durations: DurationWeekdays = {
            monday: { hours: '1', minutes: '0' },
            tuesday: { hours: '2', minutes: '0' },
            wednesday: { hours: '3', minutes: '0' },
            thursday: { hours: '4', minutes: '0' },
            friday: { hours: '5', minutes: '0' },
        };
        it('returns correctly for monday', () => {
            const result = getDurationForWeekday(durations, 1);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('1');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for tuesday', () => {
            const result = getDurationForWeekday(durations, 2);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('2');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for wednesday', () => {
            const result = getDurationForWeekday(durations, 3);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('3');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for thursday', () => {
            const result = getDurationForWeekday(durations, 4);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('4');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for friday', () => {
            const result = getDurationForWeekday(durations, 5);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('5');
            expect(result?.minutes).toEqual('0');
        });
    });
});
