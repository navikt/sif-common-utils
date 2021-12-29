import { ISODateToDate } from '..';
import dateFormatter from '../dateFormatter';

describe('dateFormatter', () => {
    const date = ISODateToDate('2021-01-01');
    it('formats compact', () => {
        expect(dateFormatter.compact(date)).toEqual('01.01.2021');
    });
    it('formats extended', () => {
        expect(dateFormatter.extended(date)).toEqual('1. jan. 2021');
    });
    it('formats full date', () => {
        expect(dateFormatter.full(date)).toEqual('1. januar 2021');
    });
    it('formats name of day', () => {
        expect(dateFormatter.dayName(date)).toEqual('fredag');
    });
    it('formats compact with day name', () => {
        expect(dateFormatter.compactWithDayName(date)).toEqual('fredag 01.01.2021');
    });
    it('formats extended with day name', () => {
        expect(dateFormatter.extendedWithDayName(date)).toEqual('fredag 1. jan. 2021');
    });
    it('formats full with day name', () => {
        expect(dateFormatter.fullWithDayName(date)).toEqual('fredag 1. januar 2021');
    });
    it('formats dayDateAndMonth', () => {
        expect(dateFormatter.dayDateAndMonth(date)).toEqual('fredag 01. jan.');
    });
    it('formats dayFullShortDate', () => {
        expect(dateFormatter.dayFullShortDate(date)).toEqual('fredag 01.01.21');
    });
});
