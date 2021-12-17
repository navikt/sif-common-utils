/** YYYY-MM-DD/YYYY-MM-DD */
export type ISODateRange = string;

/** PT0H0M - kun timer og minutter */
export type ISODuration = string;

/** YYYY-MM-DD */
export type ISODate = string;

export interface DateRange {
    from: Date;
    to: Date;
}
export type MaybeDateRange = Partial<DateRange>;

export interface Duration {
    hours: string;
    minutes: string;
}
export type MaybeDuration = Partial<Duration>;

export type DecimalTime = number;
