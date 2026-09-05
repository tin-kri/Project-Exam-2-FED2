import { describe, expect, test } from "vitest";
import {
  calculateNights,
  calculateTotal,
  formatBookingDate,
} from "../utils/booking";

describe("calculateNights", () => {
  test("calculates nights correctly for a normal date range", () => {
    expect(calculateNights("2026-09-10", "2026-09-15")).toBe(5);
  });

  test("returns 1 for a one-night stay", () => {
    expect(calculateNights("2026-09-10", "2026-09-11")).toBe(1);
  });

  test("returns 0 when the dates are the same", () => {
    expect(calculateNights("2026-09-10", "2026-09-10")).toBe(0);
  });

  test("returns 0 when the start date is invalid", () => {
    expect(calculateNights("invalid-date", "2026-09-15")).toBe(0);
  });

  test("returns 0 when the end date is invalid", () => {
    expect(calculateNights("2026-09-10", "invalid-date")).toBe(0);
    expect(calculateNights("2026-09-10", "not-a-date")).toBe(0);
  });
});

describe("calculateTotal", () => {
  test("multiplies nights by price per night", () => {
    expect(calculateTotal(5, 200)).toBe(1000);
  });

  test("returns 0 when pricePerNight is 0 or less", () => {
    expect(calculateTotal(5, 0)).toBe(0);
    expect(calculateTotal(5, -100)).toBe(0);
  });
});

describe("formatBookingDate", () => {
  test("formats an ISO date string to en-GB", () => {
    expect(formatBookingDate("2026-06-01T00:00:00Z")).toBe("1 June 2026");
  });

  test("formats a date with - in it to correct string", () => {
    expect(formatBookingDate("2026-12-25")).toBe("25 December 2026");
  });
});
