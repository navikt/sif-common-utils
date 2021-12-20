import { parse } from 'iso8601-duration';
import { Duration, InputDuration, ISODuration } from '.';

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
    const parts = parse(duration);
    return parts
        ? {
              hours: `${parts.hours}`,
              minutes: `${parts.minutes}`,
          }
        : undefined;
};

export const decimalDurationToDuration = (duration: number): Duration => {
    const hours = Math.floor(duration);
    const minutes = Math.round(60 * (duration % 1));
    return {
        hours,
        minutes,
    };
};

export const durationToDecimalDuration = (duration: Duration): number => {
    const hours: number = typeof duration.hours === 'string' ? parseInt(duration.hours, 10) : duration.hours;
    const minutes: number = typeof duration.minutes === 'string' ? parseInt(duration.minutes, 10) : duration.minutes;
    const decimalTime = (hours || 0) + ((100 / 60) * (minutes || 0)) / 100;
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
