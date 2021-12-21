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
});
