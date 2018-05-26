import { isNumber } from "util";

export function toLocalDate(utcDate, ignoreDstOffset) {
  if (isNumber(utcDate)) {
    return fromTimestamp(utcDate, ignoreDstOffset);
  } else {
    throw new Error("Unknown date format");
  }
}

function fromTimestamp(timestamp, ignoreDstOffset) {
  ignoreDstOffset = ignoreDstOffset || false;

  const utcTimestamp = timestamp * 1000;
  const utcDate = new Date(utcTimestamp);

  let localTimestamp =
    utcDate.getTime() + Math.abs(stdTimezoneOffset(utcDate)) * 60 * 1000;

  if (ignoreDstOffset) {
    localTimestamp -= isDstObserved(utcDate) ? 60 * 60 * 1000 : 0;
  }

  const localDate = new Date(localTimestamp);
  return localDate;
}

export function stdTimezoneOffset(date) {
  var jan = new Date(date.getFullYear(), 0, 1);
  var jul = new Date(date.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

export function isDstObserved(date) {
  return date.getTimezoneOffset() < stdTimezoneOffset(date);
}
