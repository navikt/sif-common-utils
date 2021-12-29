import dayjs from 'dayjs';
require('dayjs/locale/nb');

dayjs.locale('nb');

const compactFormat = 'DD.MM.YYYY';
const extendedFormat = 'D. MMM YYYY';
const fullFormat = 'D. MMMM YYYY';

const dateFormatter = {
    /**
     *
     * @param date: Date
     * @returns 01.01.2020
     */
    compact: (date: Date) => dayjs(date).format(compactFormat),

    /**
     *
     * @param date: Date
     * @returns 1. jan. 2021
     */
    extended: (date: Date) => dayjs(date).format(extendedFormat),

    /**
     *
     * @param date: Date
     * @returns 1. januar 2021
     */
    full: (date: Date) => dayjs(date).format(fullFormat),

    /**
     *
     * @param date: Date
     * @returns fredag
     */
    dayName: (date: Date) => `${dayjs(date).format('dddd')}`,

    /**
     *
     * @param date: Date
     * @returns fredag 01.01.2021
     */
    compactWithDayName: (date: Date) => `${dateFormatter.dayName(date)} ${dateFormatter.compact(date)}`,

    /**
     *
     * @param date: Date
     * @returns fredag 1. jan. 2021
     */
    extendedWithDayName: (date: Date) => `${dateFormatter.dayName(date)} ${dateFormatter.extended(date)}`,

    /**
     *
     * @param date: Date
     * @returnsfredag 1. januar 2021
     */
    fullWithDayName: (date: Date) => `${dateFormatter.dayName(date)} ${dateFormatter.full(date)}`,

    /**
     *
     * @param date: Date
     * @returns fredag 01. jan.
     */
    dayDateAndMonth: (date: Date) => dayjs(date).format('dddd DD. MMM'),

    /**
     *
     * @param date: Date
     * @returns fredag 01.01.21
     */
    dayFullShortDate: (date: Date) => `${dayjs(date).format('dddd')} ${dayjs(date).format('DD.MM.YY')}`,
};

export default dateFormatter;
