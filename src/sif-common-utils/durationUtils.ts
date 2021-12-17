import { parse } from 'iso8601-duration';
import { Duration, ISODuration } from '.';

export const inputTimeToISODuration = ({ hours, minutes }: Partial<Duration>): ISODuration => {
    return `PT${hours || 0}H${minutes || 0}M`;
};

export const ISODurationToInputTime = (duration: string): Duration | undefined => {
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
        hours: `${hours}`,
        minutes: `${minutes}`,
    };
};

export const durationToDecimalDuration = (duration: Duration): number => {
    const hours: number = typeof duration.hours === 'string' ? parseInt(duration.hours, 10) : duration.hours;
    const minutes: number = typeof duration.minutes === 'string' ? parseInt(duration.minutes, 10) : duration.minutes;
    return (hours || 0) + ((100 / 60) * (minutes || 0)) / 100;
};

export const isValidDuration = (duration: Partial<Duration> | undefined): duration is Duration => {
    return (
        duration !== undefined &&
        duration.hours !== undefined &&
        (typeof duration.hours === 'string' || !isNaN(duration.hours)) &&
        duration.minutes !== undefined &&
        (typeof duration.minutes === 'string' || !isNaN(duration.minutes)) &&
        parseInt(duration.minutes, 10) < 60
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
