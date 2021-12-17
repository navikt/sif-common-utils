"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYearMonthKey = exports.dateIsWeekDay = exports.isDateInDates = exports.getFirstWeekDayInMonth = exports.getLastWeekDayInMonth = exports.getDatesInMonth = exports.getISOWeekdayFromISODate = exports.ISODateToDate = exports.dateToISODate = exports.prettifyDateFull = exports.prettifyDateExtended = exports.prettifyDate = exports.dateToday = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isoWeek_1 = __importDefault(require("dayjs/plugin/isoWeek"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const dateRangeUtils_1 = require("./dateRangeUtils");
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(isoWeek_1.default);
const ISODateFormat = 'YYYY-MM-DD';
const prettyDateFormat = 'DD.MM.YYYY';
const prettyDateFormatExtended = 'D. MMM YYYY';
const prettyDateFormatFull = 'D. MMMM YYYY';
exports.dateToday = (0, dayjs_1.default)().toDate();
const prettifyDate = (date) => (0, dayjs_1.default)(date).format(prettyDateFormat);
exports.prettifyDate = prettifyDate;
const prettifyDateExtended = (date) => (0, dayjs_1.default)(date).format(prettyDateFormatExtended);
exports.prettifyDateExtended = prettifyDateExtended;
const prettifyDateFull = (date) => (0, dayjs_1.default)(date).format(prettyDateFormatFull);
exports.prettifyDateFull = prettifyDateFull;
const dateToISODate = (date) => (0, dayjs_1.default)(date).format(ISODateFormat);
exports.dateToISODate = dateToISODate;
const ISODateToDate = (isoDate) => {
    return dayjs_1.default.utc(isoDate, ISODateFormat).toDate();
};
exports.ISODateToDate = ISODateToDate;
const getISOWeekdayFromISODate = (isoDate) => {
    return (0, dayjs_1.default)((0, exports.ISODateToDate)(isoDate)).isoWeekday();
};
exports.getISOWeekdayFromISODate = getISOWeekdayFromISODate;
const getDatesInMonth = (month, onlyWeekDays = false) => {
    return (0, dateRangeUtils_1.getDatesInDateRange)((0, dateRangeUtils_1.getMonthDateRange)(month, onlyWeekDays), onlyWeekDays);
};
exports.getDatesInMonth = getDatesInMonth;
const getLastWeekDayInMonth = (month) => {
    return (0, dayjs_1.default)(month).endOf('month').startOf('week').add(4, 'days').toDate();
};
exports.getLastWeekDayInMonth = getLastWeekDayInMonth;
const getFirstWeekDayInMonth = (month) => {
    const firstDay = (0, dayjs_1.default)(month).startOf('month');
    if (firstDay.isoWeekday() > 5) {
        return firstDay.add(8 - firstDay.isoWeekday(), 'days').toDate();
    }
    return firstDay.toDate();
};
exports.getFirstWeekDayInMonth = getFirstWeekDayInMonth;
const isDateInDates = (date, dates) => {
    if (!dates) {
        return false;
    }
    return dates.some((d) => (0, dayjs_1.default)(date).isSame(d, 'day'));
};
exports.isDateInDates = isDateInDates;
const dateIsWeekDay = (date) => {
    return (0, dayjs_1.default)(date).isoWeekday() <= 5;
};
exports.dateIsWeekDay = dateIsWeekDay;
const getYearMonthKey = (date) => (0, dayjs_1.default)(date).format('YYYY-MM');
exports.getYearMonthKey = getYearMonthKey;
