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

export interface NumberDuration {
    hours: number;
    minutes: number;
}

export enum Weekday {
    'monday' = 'monday',
    'tuesday' = 'tuesday',
    'wednesday' = 'wednesday',
    'thursday' = 'thursday',
    'friday' = 'friday',
}

export type DurationWeekdays = {
    [Weekday.monday]?: DateDuration;
    [Weekday.tuesday]?: DateDuration;
    [Weekday.wednesday]?: DateDuration;
    [Weekday.thursday]?: DateDuration;
    [Weekday.friday]?: DateDuration;
};

export interface DateDuration {
    hours: string;
    minutes: string;
    percentage?: number;
}

export type DateDurationMap = { [isoDate: ISODate]: Partial<DateDuration> };
