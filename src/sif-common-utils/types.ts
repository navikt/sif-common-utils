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
    hours: number;
    minutes: number;
}
export interface InputDuration {
    hours: string;
    minutes: string;
}

export type DecimalTime = number;

export enum Weekday {
    'monday' = 'monday',
    'tuesday' = 'tuesday',
    'wednesday' = 'wednesday',
    'thursday' = 'thursday',
    'friday' = 'friday',
}

export type DurationWeekdays = {
    [Weekday.monday]?: InputDuration;
    [Weekday.tuesday]?: InputDuration;
    [Weekday.wednesday]?: InputDuration;
    [Weekday.thursday]?: InputDuration;
    [Weekday.friday]?: InputDuration;
};

export interface WorkDuration {
    duration: Partial<InputDuration>;
    percentage?: number;
}

export type WorkDurationMap = { [isoDate: ISODate]: WorkDuration };

export type DateDurationMap = { [isoDate: ISODate]: Partial<Duration> | Partial<InputDuration> };
