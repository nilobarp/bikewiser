import { toLocalDate, stdTimezoneOffset, isDstObserved } from "./date";

describe("Date format", () => {
  test("convert utc time to local with DST", () => {
    const timestamp = 1522130400;
    const localDate = toLocalDate(timestamp);

    expect(localDate.toLocaleString()).toEqual("2018-3-28 02:00:00");
  });

  test("convert utc time to local ignoring DST", () => {
    const timestamp = 1522130400;
    const localDate = toLocalDate(timestamp, true);

    expect(localDate.toLocaleString()).toEqual("2018-3-28 01:00:00");
  });

  test("Standard timezone offset", () => {
    const currentSystemDate = new Date();
    const offset = stdTimezoneOffset(currentSystemDate);

    expect(offset).toEqual(currentSystemDate.getTimezoneOffset());
  });

  test("DST observed", () => {
    const dateInDST = new Date("2018-03-26T20:00:00.660");
    const dateNotInDST = new Date("2018-05-26T20:00:00.600");
    expect(isDstObserved(dateInDST)).toBeTruthy();
    expect(isDstObserved(dateNotInDST)).toBeFalsy();
  });
});
