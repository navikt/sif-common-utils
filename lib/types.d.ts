export declare type ISODateRange = string;
export declare type ISODuration = string;
export declare type ISODate = string;
export interface DateRange {
    from: Date;
    to: Date;
}
export declare type MaybeDateRange = Partial<DateRange>;
export interface Duration {
    hours: string;
    minutes: string;
}
export declare type MaybeDuration = Partial<Duration>;
export declare type DecimalTime = number;
