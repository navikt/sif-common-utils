import { parse } from 'iso8601-duration';
import { Duration, InputDuration, ISODuration, MaybeDuration } from '.';

export const durationToISODuration = ({ hours, minutes }: Partial<Duration>): ISODuration => {
    return `PT${hours || 0}H${minutes || 0}M`;
};

export const ISODurationToDuration = (duration: string): Duration => {
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

export const decimalDurationToDuration = (duration: number): Duration => {
    const hours = Math.floor(duration);
    const minutes = Math.round(60 * (duration % 1));
    return {
        hours,
        minutes,
    };
};

export const maybeDurationToDecimalDuration = (maybeDuration: MaybeDuration): number => {
    const duration = { hours: maybeDuration.hours || 0, minutes: maybeDuration.minutes || 0 };
    return durationToDecimalDuration(duration);
};

export const durationToDecimalDuration = (maybeDuration: Duration): number => {
    const decimalTime = (maybeDuration.hours || 0) + ((100 / 60) * (maybeDuration.minutes || 0)) / 100;
    return Math.round(decimalTime * 100) / 100;
};

/**
 * Validates duration as Time (max 59 minutes)
 * @param duration
 * @returns
 */
export const isValidDuration = (duration: Partial<Duration> | undefined): duration is Duration => {
    return (
        duration !== undefined &&
        duration.hours !== undefined &&
        !isNaN(duration.hours) &&
        duration.minutes !== undefined &&
        !isNaN(duration.minutes) &&
        duration.minutes < 60
    );
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
//     if (hideZeroMinutes && time.minutes === '0') {
//         return intlHelper(intl, 'timer', { timer: time.hours });
//     }
//     return intlHelper(intl, 'timerOgMinutter', { timer: time.hours, minutter: time.minutes });
// };
