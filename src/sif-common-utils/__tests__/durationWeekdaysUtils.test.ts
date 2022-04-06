import { DurationWeekdays, getDurationForISOWeekday } from '..';
import {
    getAllWeekdaysWithoutDuration,
    getWeekdaysWithDuration,
    summarizeDurationInDurationWeekdays,
} from '../durationWeekdaysUtils';
import { Duration, Weekday } from '../types';

const duration: Duration = {
    hours: '1',
    minutes: '0',
};

const fullWeek: DurationWeekdays = {
    monday: { ...duration },
    tuesday: { ...duration },
    wednesday: { ...duration },
    thursday: { ...duration },
    friday: { ...duration },
};
describe('workDurationUtils', () => {
    describe('summarizeDurationInDurationWeekdays', () => {
        it('sum hours correctly', () => {
            const sum = summarizeDurationInDurationWeekdays({
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
            const sum = summarizeDurationInDurationWeekdays({
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
    describe('getDurationForISOWeekday', () => {
        const durations: DurationWeekdays = {
            monday: { hours: '1', minutes: '0' },
            tuesday: { hours: '2', minutes: '0' },
            wednesday: { hours: '3', minutes: '0' },
            thursday: { hours: '4', minutes: '0' },
            friday: { hours: '5', minutes: '0' },
        };
        it('returns correctly for monday', () => {
            const result = getDurationForISOWeekday(durations, 1);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('1');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for tuesday', () => {
            const result = getDurationForISOWeekday(durations, 2);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('2');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for wednesday', () => {
            const result = getDurationForISOWeekday(durations, 3);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('3');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for thursday', () => {
            const result = getDurationForISOWeekday(durations, 4);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('4');
            expect(result?.minutes).toEqual('0');
        });
        it('returns correctly for friday', () => {
            const result = getDurationForISOWeekday(durations, 5);
            expect(result).toBeDefined();
            expect(result?.hours).toEqual('5');
            expect(result?.minutes).toEqual('0');
        });
    });

    describe('getWeekdaysWithDuration', () => {
        it('returnerer alle ukedager når alle ukedager har varighet', () => {
            const weekdays = getWeekdaysWithDuration(fullWeek);
            expect(weekdays.length).toEqual(5);
            expect(weekdays[0]).toEqual(Weekday.monday);
            expect(weekdays[1]).toEqual(Weekday.tuesday);
            expect(weekdays[2]).toEqual(Weekday.wednesday);
            expect(weekdays[3]).toEqual(Weekday.thursday);
            expect(weekdays[4]).toEqual(Weekday.friday);
        });
        it('returnerer ikke ukedag som har varighet === undefined ', () => {
            const weekdays = getWeekdaysWithDuration({ thursday: { hours: '1', minutes: '0' }, friday: undefined });
            expect(weekdays.length).toEqual(1);
            expect(weekdays[0]).toEqual(Weekday.thursday);
        });
        it('returnerer ikke ukedag som har varighet === 0 timer 0 minutter ', () => {
            const weekdays = getWeekdaysWithDuration({
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '0', minutes: '0' },
            });
            expect(weekdays.length).toEqual(1);
            expect(weekdays[0]).toEqual(Weekday.thursday);
        });
    });
    describe('getAllWeekdaysWithoutDuration', () => {
        it('returnerer ingen ukedager når alle ukedager har varighet', () => {
            const weekdays = getAllWeekdaysWithoutDuration(fullWeek);
            expect(weekdays.length).toEqual(0);
        });
        it('returnerer alle ukedager når ingen ukedager har varighet', () => {
            const weekdays = getAllWeekdaysWithoutDuration({});
            expect(weekdays.length).toEqual(5);
            expect(weekdays[0]).toEqual(Weekday.monday);
            expect(weekdays[1]).toEqual(Weekday.tuesday);
            expect(weekdays[2]).toEqual(Weekday.wednesday);
            expect(weekdays[3]).toEqual(Weekday.thursday);
            expect(weekdays[4]).toEqual(Weekday.friday);
        });
        it('returnerer ukedag som har varighet === undefined, eller som ikke er definert i weekdays', () => {
            const weekdays = getAllWeekdaysWithoutDuration({ friday: { hours: '1', minutes: '0' } });
            expect(weekdays.length).toEqual(4);
            expect(weekdays[3]).toEqual(Weekday.thursday);
        });
        it('returnerer alle ukedager som har varighet === 0 timer 0 minutter, eller som ikke er definert i weekdays', () => {
            const weekdays = getAllWeekdaysWithoutDuration({
                monday: { hours: '1', minutes: '0' },
                tuesday: { hours: '0', minutes: '0' },
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '0', minutes: '0' },
            });
            expect(weekdays.length).toEqual(3);
            expect(weekdays[0]).toEqual(Weekday.tuesday);
            expect(weekdays[1]).toEqual(Weekday.wednesday);
            expect(weekdays[2]).toEqual(Weekday.friday);
        });
    });
});
