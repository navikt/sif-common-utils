"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const dateRangeUtils_1 = require("../dateRangeUtils");
describe('dateRangeUtils', () => {
    describe('getWeeksInDateRange', () => {
        it('returnerer 1 når det perioden er innenfor én uke', () => {
            const dateRange = {
                from: (0, __1.ISODateToDate)('2021-01-04'),
                to: (0, __1.ISODateToDate)('2021-01-10'),
            };
            const result = (0, dateRangeUtils_1.getWeeksInDateRange)(dateRange);
            expect((0, dateRangeUtils_1.getWeeksInDateRange)(dateRange).length).toBe(1);
            expect((0, __1.dateToISODate)(result[0].from)).toEqual('2021-01-04');
            expect((0, __1.dateToISODate)(result[0].to)).toEqual('2021-01-10');
        });
        it('returnerer 2 når det daperioden er søndag til påfølgende søndag', () => {
            const dateRange = {
                from: (0, __1.ISODateToDate)('2021-01-03'),
                to: (0, __1.ISODateToDate)('2021-01-10'),
            };
            const result = (0, dateRangeUtils_1.getWeeksInDateRange)(dateRange);
            expect((0, dateRangeUtils_1.getWeeksInDateRange)(dateRange).length).toBe(2);
            expect((0, __1.dateToISODate)(result[0].from)).toEqual('2021-01-03');
            expect((0, __1.dateToISODate)(result[0].to)).toEqual('2021-01-03');
            expect((0, __1.dateToISODate)(result[1].from)).toEqual('2021-01-04');
            expect((0, __1.dateToISODate)(result[1].to)).toEqual('2021-01-10');
        });
        it('returnerer 3 når det perioden er søndag til påfølgende søndag', () => {
            const dateRange = {
                from: (0, __1.ISODateToDate)('2021-01-03'),
                to: (0, __1.ISODateToDate)('2021-01-11'),
            };
            const result = (0, dateRangeUtils_1.getWeeksInDateRange)(dateRange);
            expect((0, dateRangeUtils_1.getWeeksInDateRange)(dateRange).length).toBe(3);
            expect((0, __1.dateToISODate)(result[0].from)).toEqual('2021-01-03');
            expect((0, __1.dateToISODate)(result[0].to)).toEqual('2021-01-03');
            expect((0, __1.dateToISODate)(result[1].from)).toEqual('2021-01-04');
            expect((0, __1.dateToISODate)(result[1].to)).toEqual('2021-01-10');
            expect((0, __1.dateToISODate)(result[2].from)).toEqual('2021-01-11');
            expect((0, __1.dateToISODate)(result[2].to)).toEqual('2021-01-11');
        });
    });
    describe('getNumberOfDaysInDateRange', () => {
        describe('Når en teller med helgedager', () => {
            it('returnerer 1 når det er samme fra og til dato', () => {
                const result = (0, dateRangeUtils_1.getNumberOfDaysInDateRange)({
                    from: (0, __1.ISODateToDate)('2021-02-01'),
                    to: (0, __1.ISODateToDate)('2021-02-01'),
                });
                expect(result).toBe(1);
            });
            it('returnerer 2 når til-dato er dagen etter fra-dato', () => {
                const result = (0, dateRangeUtils_1.getNumberOfDaysInDateRange)({
                    from: (0, __1.ISODateToDate)('2021-02-01'),
                    to: (0, __1.ISODateToDate)('2021-02-02'),
                });
                expect(result).toBe(2);
            });
            it('returnerer 3 når til-dato er to dager etter fra-dato', () => {
                const result = (0, dateRangeUtils_1.getNumberOfDaysInDateRange)({
                    from: (0, __1.ISODateToDate)('2021-02-01'),
                    to: (0, __1.ISODateToDate)('2021-02-03'),
                });
                expect(result).toBe(3);
            });
        });
        describe('når en ekskluderer helgedager', () => {
            it('returnerer 1 når det er fredag + helg', () => {
                const result = (0, dateRangeUtils_1.getNumberOfDaysInDateRange)({
                    from: (0, __1.ISODateToDate)('2021-02-05'),
                    to: (0, __1.ISODateToDate)('2021-02-06'),
                }, true);
                const result2 = (0, dateRangeUtils_1.getNumberOfDaysInDateRange)({
                    from: (0, __1.ISODateToDate)('2021-02-05'),
                    to: (0, __1.ISODateToDate)('2021-02-07'),
                }, true);
                expect(result).toBe(1);
                expect(result2).toBe(1);
            });
            it('returnerer 2 når det er fredag + helg + mandag', () => {
                const result = (0, dateRangeUtils_1.getNumberOfDaysInDateRange)({
                    from: (0, __1.ISODateToDate)('2021-02-05'),
                    to: (0, __1.ISODateToDate)('2021-02-08'),
                }, true);
                expect(result).toBe(2);
            });
        });
    });
    describe('getDatesInMonthOutsideDateRange', () => {
        it('returnerer alle dager i måned før fra-dato i periode', () => {
            const result = (0, dateRangeUtils_1.getDatesInMonthOutsideDateRange)((0, __1.ISODateToDate)('2021-01-01'), {
                from: (0, __1.ISODateToDate)('2021-01-04'),
                to: (0, __1.ISODateToDate)('2021-01-31'),
            });
            expect((0, __1.dateToISODate)(result[0])).toEqual('2021-01-01');
            expect((0, __1.dateToISODate)(result[1])).toEqual('2021-01-02');
            expect((0, __1.dateToISODate)(result[2])).toEqual('2021-01-03');
        });
        it('returnerer alle dager i måned etter til-dato i periode', () => {
            const result = (0, dateRangeUtils_1.getDatesInMonthOutsideDateRange)((0, __1.ISODateToDate)('2021-01-01'), {
                from: (0, __1.ISODateToDate)('2021-01-01'),
                to: (0, __1.ISODateToDate)('2021-01-28'),
            });
            expect((0, __1.dateToISODate)(result[0])).toEqual('2021-01-29');
            expect((0, __1.dateToISODate)(result[1])).toEqual('2021-01-30');
            expect((0, __1.dateToISODate)(result[2])).toEqual('2021-01-31');
        });
        it('returnerer alle dager i måned etter til-dato i periode når perioden er kun den første dagen i måneden', () => {
            const result = (0, dateRangeUtils_1.getDatesInMonthOutsideDateRange)((0, __1.ISODateToDate)('2021-01-01'), {
                from: (0, __1.ISODateToDate)('2021-01-01'),
                to: (0, __1.ISODateToDate)('2021-01-01'),
            });
            expect((0, __1.dateToISODate)(result[0])).toEqual('2021-01-02');
        });
    });
});
