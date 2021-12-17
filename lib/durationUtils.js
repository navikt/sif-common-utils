"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDuration = exports.durationToDecimalDuration = exports.decimalDurationToDuration = exports.ISODurationToInputTime = exports.inputTimeToISODuration = void 0;
const iso8601_duration_1 = require("iso8601-duration");
const inputTimeToISODuration = ({ hours, minutes }) => {
    return `PT${hours || 0}H${minutes || 0}M`;
};
exports.inputTimeToISODuration = inputTimeToISODuration;
const ISODurationToInputTime = (duration) => {
    const parts = (0, iso8601_duration_1.parse)(duration);
    return parts
        ? {
            hours: `${parts.hours}`,
            minutes: `${parts.minutes}`,
        }
        : undefined;
};
exports.ISODurationToInputTime = ISODurationToInputTime;
const decimalDurationToDuration = (duration) => {
    const hours = Math.floor(duration);
    const minutes = Math.round(60 * (duration % 1));
    return {
        hours: `${hours}`,
        minutes: `${minutes}`,
    };
};
exports.decimalDurationToDuration = decimalDurationToDuration;
const durationToDecimalDuration = (duration) => {
    const hours = typeof duration.hours === 'string' ? parseInt(duration.hours, 10) : duration.hours;
    const minutes = typeof duration.minutes === 'string' ? parseInt(duration.minutes, 10) : duration.minutes;
    return (hours || 0) + ((100 / 60) * (minutes || 0)) / 100;
};
exports.durationToDecimalDuration = durationToDecimalDuration;
const isValidDuration = (duration) => {
    return (duration !== undefined &&
        duration.hours !== undefined &&
        (typeof duration.hours === 'string' || !isNaN(duration.hours)) &&
        duration.minutes !== undefined &&
        (typeof duration.minutes === 'string' || !isNaN(duration.minutes)) &&
        parseInt(duration.minutes, 10) < 60);
};
exports.isValidDuration = isValidDuration;
