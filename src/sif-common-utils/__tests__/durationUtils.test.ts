import {
    decimalDurationToDuration,
    decimalDurationToInputDuration,
    Duration,
    durationAsInputDuration,
    durationIsZero,
    durationsAreEqual,
    durationToDecimalDuration,
    durationToISODuration,
    ensureDurationIgnoreInvalid,
    ensureInputDuration,
    getNumberValue,
    inputDurationAsDuration,
    ISODurationToDuration,
    ISODurationToInputDuration,
    isValidDuration,
} from '../';
import { getDurationsDiff } from '../durationUtils';

describe('durationUtils', () => {
    describe('getNumberValue', () => {
        it('returns number when value is a number', () => {
            expect(getNumberValue(0)).toEqual(0);
            expect(getNumberValue(-20)).toEqual(-20);
        });
        it('returns number when value is a valid number string', () => {
            expect(getNumberValue('0')).toEqual(0);
            expect(getNumberValue('-20')).toEqual(-20);
        });
        it('returns undefined when value is undefined', () => {
            expect(getNumberValue(undefined)).toBeUndefined();
        });
        it('returns undefined when value is empty string', () => {
            expect(getNumberValue('')).toBeUndefined();
        });
        it('returns invalidNumberValue when value is an invalid number string', () => {
            expect(getNumberValue('a')).toEqual('invalidNumberValue');
        });
        it('returns invalidNumberValue when value is another type than number, string or undefined', () => {
            expect(getNumberValue([])).toEqual('invalidNumberValue');
            expect(getNumberValue({})).toEqual('invalidNumberValue');
        });
    });
    describe('durationAsInputDuration', () => {
        it('converts correctly', () => {
            const result = durationAsInputDuration({ hours: 1, minutes: 2 });
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('2');
        });
    });

    describe('inputDurationAsDuration', () => {
        it('returns duration correctly when inputDuration is valid', () => {
            const result = inputDurationAsDuration({ hours: '6', minutes: '30' });
            expect(result?.hours).toEqual(6);
            expect(result?.minutes).toEqual(30);
        });
    });

    describe('durationToISODuration', () => {
        it('converts {h: 0, m: 0} to ISODuration', () => {
            expect(durationToISODuration({ hours: 0, minutes: 0 })).toEqual('PT0H0M');
        });
        it('converts {h: undefined, m: 0} to ISODuration', () => {
            expect(durationToISODuration({ minutes: 0 })).toEqual('PT0H0M');
        });
        it('converts {h: 1, m: undefined} to ISODuration', () => {
            expect(durationToISODuration({ hours: 1 })).toEqual('PT1H0M');
        });
    });
    describe('ISODurationToDuration', () => {
        it('converts PT0H0M correctly', () => {
            const result = ISODurationToDuration('PT0H0M');
            expect(result?.hours).toEqual(0);
            expect(result?.minutes).toEqual(0);
        });
        it('converts PT10H50M correctly', () => {
            const result = ISODurationToDuration('PT10H50M');
            expect(result?.hours).toEqual(10);
            expect(result?.minutes).toEqual(50);
        });
        it('maintains overflow of minutes (more than 59 minutes)', () => {
            const result = ISODurationToDuration('PT10H65M');
            expect(result?.hours).toEqual(10);
            expect(result?.minutes).toEqual(65);
        });
    });
    describe('durationToDecimalDuration', () => {
        describe('duration with numbers', () => {
            it('converts 1 hour correctly', () => {
                expect(durationToDecimalDuration({ hours: 1, minutes: 0 })).toEqual(1);
            });
            it('converts 1 hour and 30 minutes correctly', () => {
                expect(durationToDecimalDuration({ hours: 1, minutes: 30 })).toEqual(1.5);
            });
            it('converts 1 hour and 59 minutes correctly', () => {
                expect(durationToDecimalDuration({ hours: 1, minutes: 59 })).toEqual(1.98);
            });
            it('handles overflow of minutes correctly', () => {
                expect(durationToDecimalDuration({ hours: 1, minutes: 120 })).toEqual(3);
            });
        });
        describe('inputDuration with strings', () => {
            it('converts 1 hour correctly', () => {
                expect(durationToDecimalDuration({ hours: '1', minutes: '0' })).toEqual(1);
            });
            it('converts 1 hour and 30 minutes correctly', () => {
                expect(durationToDecimalDuration({ hours: '1', minutes: '30' })).toEqual(1.5);
            });
            it('converts 1 hour and 59 minutes correctly', () => {
                expect(durationToDecimalDuration({ hours: '1', minutes: '59' })).toEqual(1.98);
            });
        });
    });
    describe('decimalDurationToDuration', () => {
        it('converts 1 hour correctly', () => {
            const result = decimalDurationToDuration(1);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(0);
        });
        it('converts 1,5 hours correctly', () => {
            const result = decimalDurationToDuration(1.5);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(30);
        });
        it('converts 1,98 hours correctly', () => {
            const result = decimalDurationToDuration(1.98);
            expect(result.hours).toEqual(1);
            expect(result.minutes).toEqual(59);
        });
    });
    describe('decimalDurationToInputDuration', () => {
        it('converts 1 hour correctly', () => {
            const result = decimalDurationToInputDuration(1);
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('0');
        });
        it('converts 1,5 hours correctly', () => {
            const result = decimalDurationToInputDuration(1.5);
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('30');
        });
        it('converts 1,98 hours correctly', () => {
            const result = decimalDurationToInputDuration(1.98);
            expect(result.hours).toEqual('1');
            expect(result.minutes).toEqual('59');
        });
    });
    describe('ISODurationToInputDuration', () => {
        it('returns undefined if duration is invalid', () => {
            expect(ISODurationToInputDuration('TABC')).toBeFalsy();
        });
        it('returns correct input duration when duration is valid', () => {
            expect(ISODurationToInputDuration('PT1H')?.hours).toEqual('1');
            expect(ISODurationToInputDuration('PT1M')?.minutes).toEqual('1');
        });
        it('returns 0 hours and 0 minutes when duration is valid, but hours and minutes not set', () => {
            expect(ISODurationToInputDuration('PT')?.hours).toEqual('0');
            expect(ISODurationToInputDuration('PT')?.minutes).toEqual('0');
        });
    });
    describe('isValidDuration', () => {
        it('returns false if duration is undefined', () => {
            expect(isValidDuration(undefined)).toBeFalsy();
        });
        it('returns false if duration is inputDuration with empty strings', () => {
            expect(isValidDuration({ hours: '', minutes: '' })).toBeFalsy();
        });
        it('returns false if duration is inputDuration with invalid values in hours and or minutes', () => {
            expect(isValidDuration({ hours: 'a', minutes: '' })).toBeFalsy();
            expect(isValidDuration({ hours: 'a', minutes: '0' })).toBeFalsy();
            expect(isValidDuration({ hours: '0', minutes: '-' })).toBeFalsy();
            expect(isValidDuration({ hours: '', minutes: '' })).toBeFalsy();
        });
        it('returns true if duration is inputDuration with value for minutes and/or hours', () => {
            expect(isValidDuration({ hours: '1', minutes: '' })).toBeTruthy();
            expect(isValidDuration({ hours: '', minutes: '1' })).toBeTruthy();
            expect(isValidDuration({ hours: '1', minutes: '1' })).toBeTruthy();
            expect(isValidDuration({ hours: '0', minutes: '0' })).toBeTruthy();
        });
        it('returns true on valid duration', () => {
            expect(isValidDuration({ hours: 0, minutes: 0 })).toBeTruthy();
        });
        it('returns true on valid duration - with hours and minutes', () => {
            expect(isValidDuration({ hours: 15, minutes: 59 })).toBeTruthy();
        });
        it('returns false if duration has minutes above 59', () => {
            expect(isValidDuration({ hours: 15, minutes: 60 })).toBeFalsy();
        });
    });

    describe('durationIsZero', () => {
        it('verifies no duration', () => {
            expect(durationIsZero({})).toBeTruthy();
        });
        it('fails if hours is more than zero', () => {
            expect(durationIsZero({ hours: 1 })).toBeFalsy();
        });
        it('fails if minutes is more than 0', () => {
            expect(durationIsZero({ minutes: 1 })).toBeFalsy();
        });
    });

    describe('ensureDurationIgnoreInvalid', () => {
        it('returns valid duration if hours or minutes are missing', () => {
            const duration = ensureDurationIgnoreInvalid({});
            expect(duration.hours).toEqual(0);
            expect(duration.minutes).toEqual(0);
        });
        it('returns 0 hours and 0 minutes if hours or minutes are invalid', () => {
            const duration = ensureDurationIgnoreInvalid({ hours: 'a', minutes: 'b' });
            expect(duration.hours).toEqual(0);
            expect(duration.minutes).toEqual(0);
        });
        it('keeps hours if hours are defined and minutes are undefined', () => {
            const duration = ensureDurationIgnoreInvalid({ hours: 1 });
            expect(duration.hours).toEqual(1);
            expect(duration.minutes).toEqual(0);
        });
        it('keeps minutes if hours are defined and minutes are undefined', () => {
            const duration = ensureDurationIgnoreInvalid({ minutes: 1 });
            expect(duration.hours).toEqual(0);
            expect(duration.minutes).toEqual(1);
        });
        it('keeps hours and minutes if both are defined', () => {
            const duration = ensureDurationIgnoreInvalid({ hours: 1, minutes: 2 });
            expect(duration.hours).toEqual(1);
            expect(duration.minutes).toEqual(2);
        });
        it('handles hours and minutes when they are strings', () => {
            const duration = ensureDurationIgnoreInvalid({ hours: '1', minutes: '2' });
            expect(duration.hours).toEqual(1);
            expect(duration.minutes).toEqual(2);
        });
    });
    describe('ensureInputDuration', () => {
        it('returns valid duration if hours or minutes are missing', () => {
            const duration = ensureInputDuration({});
            expect(duration.hours).toEqual('0');
            expect(duration.minutes).toEqual('0');
        });
        it('keeps hours if hours are defined and minutes are undefined', () => {
            const duration = ensureInputDuration({ hours: '1' });
            expect(duration.hours).toEqual('1');
            expect(duration.minutes).toEqual('0');
        });
        it('keeps minutes if hours are defined and minutes are undefined', () => {
            const duration = ensureInputDuration({ minutes: 1 });
            expect(duration.hours).toEqual('0');
            expect(duration.minutes).toEqual('1');
        });
        it('keeps hours and minutes if both are defined', () => {
            const duration = ensureInputDuration({ hours: 1, minutes: 2 });
            expect(duration.hours).toEqual('1');
            expect(duration.minutes).toEqual('2');
        });
    });
    describe('durationsAreEqual', () => {
        const dur1: Duration = ISODurationToDuration('PT2H0M');
        const dur2: Duration = ISODurationToDuration('PT2H0M');
        const dur3: Duration = ISODurationToDuration('PT3H0M');

        it('returns true if both are undefined', () => {
            expect(durationsAreEqual(undefined, undefined)).toBeTruthy();
        });

        it('returns true when equal durations', () => {
            expect(durationsAreEqual(dur1, dur2)).toBeTruthy();
        });

        it('returns false if only one of them are undefined', () => {
            expect(durationsAreEqual(dur1, undefined)).toBeFalsy();
            expect(durationsAreEqual(undefined, dur1)).toBeFalsy();
        });
        it('returns false when not equal durations', () => {
            expect(durationsAreEqual(dur1, dur3)).toBeFalsy();
        });
    });
    describe('getDurationsDiff', () => {
        it('removes equal values', () => {
            const result = getDurationsDiff(
                { '2021-01-01': { hours: '1', minutes: '2' } },
                { '2021-01-01': { hours: '1', minutes: '2' } }
            );
            expect(Object.keys(result).length).toBe(0);
        });
        it('returns changed values', () => {
            const result = getDurationsDiff(
                { '2021-01-01': { hours: '1', minutes: '2' } },
                { '2021-01-01': { hours: '2', minutes: '2' } }
            );
            expect(Object.keys(result).length).toBe(1);
        });
        it('returns new values', () => {
            const result = getDurationsDiff({ '2021-01-01': { hours: '1', minutes: '2' } }, {});
            expect(Object.keys(result).length).toBe(1);
        });
    });
});
