import { Duration, ISODuration } from '.';
export declare const inputTimeToISODuration: ({ hours, minutes }: Partial<Duration>) => ISODuration;
export declare const ISODurationToInputTime: (duration: string) => Duration | undefined;
export declare const decimalDurationToDuration: (duration: number) => Duration;
export declare const durationToDecimalDuration: (duration: Duration) => number;
export declare const isValidDuration: (duration: Partial<Duration> | undefined) => duration is Duration;
