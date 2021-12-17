import { DateRange, ISODate, ISODateRange, MaybeDateRange } from '.';
export declare const sortDateRange: (d1: DateRange, d2: DateRange) => number;
export declare const sortDateRangeByToDate: (d1: DateRange, d2: DateRange) => number;
export declare const dateRangesCollide: (dateRanges: DateRange[], fromDateCanBeSameAsPreviousToDate?: boolean) => boolean;
export declare const datesCollideWithDateRanges: (dates: Date[], dateRanges: DateRange[]) => boolean;
export declare const dateIsWithinMaybeDateRange: (date: Date, dateRange: MaybeDateRange) => boolean;
export declare const dateIsInDateRange: (date: Date, dateRange: DateRange) => boolean;
export declare const dateIsInsideDateRange: (date: Date, dateRange: DateRange) => boolean;
export declare const getMonthsInDateRange: (dateRange: DateRange, returnFullMonths?: boolean) => DateRange[];
export declare const getMonthDateRange: (date: Date, onlyWeekDays?: boolean) => DateRange;
export declare const getWeekDateRange: (date: Date, onlyWeekDays?: boolean) => DateRange;
export declare const getWeeksInDateRange: (dateRange: DateRange) => DateRange[];
export declare const getDatesInDateRange: (dateRange: DateRange, onlyWeekDays?: boolean) => Date[];
export declare const getYearsInDateRanges: (dateRanges: DateRange[]) => number[];
export declare const getNumberOfDaysInDateRange: (dateRange: DateRange, onlyWeekDays?: boolean) => number;
export declare const getDateRangeFromDateRanges: (dateRanges: DateRange[]) => DateRange;
export declare const getDateRangesBetweenDateRanges: (dateRanges: DateRange[]) => DateRange[];
export declare const getDatesInMonthOutsideDateRange: (month: Date, dateRange: DateRange) => Date[];
export declare const ISODateRangeToDateRange: (isoDateRange: ISODateRange) => DateRange;
export declare const ISODateRangeToISODates: (isoDateRange: ISODateRange) => {
    from: ISODate;
    to: ISODate;
};
export declare const dateRangeToISODateRange: (dateRange: DateRange) => ISODateRange;
export declare const getISODatesInISODateRangeWeekendExcluded: (range: ISODateRange) => ISODate[];
declare const dateRangeUtils: {
    sort: {
        sortDateRange: (d1: DateRange, d2: DateRange) => number;
        sortDateRangeByToDate: (d1: DateRange, d2: DateRange) => number;
    };
    date: {
        dateIsWithinMaybeDateRange: (date: Date, dateRange: MaybeDateRange) => boolean;
        dateIsInDateRange: (date: Date, dateRange: DateRange) => boolean;
        dateIsInsideDateRange: (date: Date, dateRange: DateRange) => boolean;
    };
    iso: {
        dateRangeToISODateRange: (dateRange: DateRange) => ISODateRange;
        ISODateRangeToDateRange: (isoDateRange: ISODateRange) => DateRange;
        ISODateRangeToISODates: (isoDateRange: ISODateRange) => {
            from: ISODate;
            to: ISODate;
        };
    };
    isDateRange: (dateRange: any) => dateRange is DateRange;
    dateRangesCollide: (dateRanges: DateRange[], fromDateCanBeSameAsPreviousToDate?: boolean) => boolean;
    datesCollideWithDateRanges: (dates: Date[], dateRanges: DateRange[]) => boolean;
    getMonthsInDateRange: (dateRange: DateRange, returnFullMonths?: boolean) => DateRange[];
    getWeekDateRange: (date: Date, onlyWeekDays?: boolean) => DateRange;
    getMonthDateRange: (date: Date, onlyWeekDays?: boolean) => DateRange;
    getNumberOfDaysInDateRange: (dateRange: DateRange, onlyWeekDays?: boolean) => number;
    getFirstWeekDayInMonth: (month: Date) => Date;
    getLastWeekDayInMonth: (month: Date) => Date;
    getDateRangeFromDateRanges: (dateRanges: DateRange[]) => DateRange;
    getDateRangesBetweenDateRanges: (dateRanges: DateRange[]) => DateRange[];
};
export default dateRangeUtils;
