import { parse } from 'iso8601-duration';
import { trim } from 'lodash';
import { NumberDuration, InputDuration, ISODuration, DateDurationMap } from '.';

export const getPositiveNumberValue = (value: any): number | 'invalidNumberValue' | undefined => {
    if (typeof value === 'number' && value >= 0) {
        return value;
    }
    if (typeof value === 'string') {
        if (trim(value).length === 0) {
            return undefined;
        }
        const numberValue = parseInt(value, 10);
        if (!isNaN(numberValue) && numberValue >= 0) {
            return numberValue;
        }
    }
    if (typeof value === 'undefined') {
        return undefined;
    }
    return 'invalidNumberValue';
};

export const durationAsInputDuration = (duration: NumberDuration | Partial<InputDuration>): InputDuration => {
    const d = ensureDurationIgnoreInvalid(duration);
    return {
        hours: `${d.hours}`,
        minutes: `${d.minutes}`,
    };
};
export const inputDurationAsDuration = (duration: Partial<InputDuration>): NumberDuration =>
    ensureDurationIgnoreInvalid(duration);

export const ensureDurationIgnoreInvalid = (
    duration: Partial<InputDuration> | Partial<NumberDuration>
): NumberDuration => {
    const hours = getPositiveNumberValue(duration.hours);
    const minutes = getPositiveNumberValue(duration.minutes);

    if (hours === 'invalidNumberValue' || minutes === 'invalidNumberValue') {
        return { hours: 0, minutes: 0 };
    }
    return {
        hours: hours || 0,
        minutes: minutes || 0,
    };
};

export const ensureInputDuration = (duration: Partial<InputDuration> | NumberDuration): InputDuration => {
    return durationAsInputDuration(duration);
};

export const durationIsZero = (duration: NumberDuration | Partial<InputDuration>): boolean => {
    return durationToISODuration(duration) === 'PT0H0M';
};

export const durationToISODuration = (duration: NumberDuration | Partial<InputDuration>): ISODuration => {
    const { hours, minutes } = ensureDurationIgnoreInvalid(duration);
    return `PT${hours}H${minutes}M`;
};

export const durationsAreEqual = (
    duration1?: Partial<InputDuration> | NumberDuration,
    duration2?: Partial<InputDuration> | NumberDuration
): boolean => {
    if (duration1 === undefined && duration2 === undefined) {
        return true;
    }
    if (duration1 === undefined || duration2 === undefined) {
        return false;
    }
    return durationToISODuration(duration1) === durationToISODuration(duration2);
};

export const summarizeDurations = (
    durations: Array<Partial<InputDuration> | NumberDuration | undefined>
): NumberDuration => {
    let hours = 0;
    let minutes = 0;
    durations.forEach((duration) => {
        if (duration) {
            const dur = ensureDurationIgnoreInvalid(duration);
            hours += dur.hours;
            minutes += dur.minutes;
        }
    });
    return {
        hours,
        minutes,
    };
};

export const ISODurationToDuration = (duration: string): NumberDuration => {
    const parts = parse(duration);
    return {
        hours: parts.hours || 0,
        minutes: parts.minutes || 0,
    };
};

export const ISODurationToInputDuration = (duration: string): InputDuration | undefined => {
    try {
        const parts = parse(duration);
        return {
            hours: `${parts.hours}`,
            minutes: `${parts.minutes}`,
        };
    } catch (e) {
        return undefined;
    }
};

export const decimalDurationToDuration = (duration: number): NumberDuration => {
    const hours = Math.floor(duration);
    const minutes = Math.round(60 * (duration % 1));
    return {
        hours,
        minutes,
    };
};

export const decimalDurationToInputDuration = (duration: number): InputDuration => {
    const hours = Math.floor(duration);
    const minutes = Math.round(60 * (duration % 1));
    return durationAsInputDuration(
        ensureDurationIgnoreInvalid({
            hours,
            minutes,
        })
    );
};

export const durationToDecimalDuration = (duration: NumberDuration | Partial<InputDuration>): number => {
    const { hours, minutes } = ensureDurationIgnoreInvalid(duration);
    const decimalTime = hours + ((100 / 60) * minutes) / 100;
    return Math.round(decimalTime * 100) / 100;
};

/**
 * Validates duration as Time (max 59 minutes)
 * @param duration
 * @returns
 */
export const isValidDuration = (
    duration: NumberDuration | Partial<InputDuration> | undefined
): duration is NumberDuration => {
    if (!duration) {
        return false;
    }
    const hours = getPositiveNumberValue(duration.hours);
    const minutes = getPositiveNumberValue(duration.minutes);
    if (hours === 'invalidNumberValue' || minutes === 'invalidNumberValue') {
        return false;
    }
    if (hours === undefined && minutes === undefined) {
        return false;
    }
    const dur = ensureDurationIgnoreInvalid({ hours, minutes });
    return dur.hours >= 0 && dur.minutes >= 0 && dur.minutes < 60;
};

/**
 * Get all durations which is different in durations1 from durations2
 * @param durations1
 * @param durations2
 * @returns
 */
export const getDurationsDiff = (durations1: DateDurationMap, durations2: DateDurationMap): DateDurationMap => {
    const resultMap: DateDurationMap = {};
    Object.keys(durations1).forEach((isoDate) => {
        const oldValue = durations2[isoDate];
        if (oldValue && durationsAreEqual(durations1[isoDate], oldValue)) {
            return;
        }
        resultMap[isoDate] = durations1[isoDate];
    });
    return resultMap;
};

const durationUtils = {
    durationToISODuration,
    durationToDecimalDuration,
    decimalDurationToDuration,
    isValidDuration,
    ISODurationToInputDuration,
};

export default durationUtils;

// /**
//  *
//  * @param time Time
//  * @param intl intlShape
//  * @param hideZeroMinutes do not print minutes if 0 minutes
//  */
// export const timeToString = (time: Time, intl: IntlShape, hideZeroMinutes?: boolean): string => {
//     if (hideZeroMinutes && duration.minutes === '0') {
//         return intlHelper(intl, 'timer', { timer: duration.hours });
//     }
//     return intlHelper(intl, 'timerOgMinutter', { timer: duration.hours, minutter: duration.minutes });
// };
