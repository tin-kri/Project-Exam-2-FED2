import { describe, test, expect } from "vitest";
import {
  createVenueSchema,
  updateVenueSchema,
} from "../schema/venueManagementSchema";

const testVenue = {
  name: "Cozy Cabin",
  description: "A lovely retreat in the woods.",
  price: 150,
  maxGuests: 4,
};

describe("createVenueSchema", () => {
  test("accepts a test venue", () => {
    const result = createVenueSchema.safeParse(testVenue);
    expect(result.success).toBe(true);
  });

  test("uses default values when meta is missing", () => {
    const result = createVenueSchema.safeParse(testVenue);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.meta).toEqual({
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      });
    }
  });
  test("accepts a name with the 100 character boundary", () => {
    const result = createVenueSchema.safeParse({
      ...testVenue,
      name: "abc".repeat(25),
    });
    expect(result.success).toBe(true);
  });
});

describe("updateVenueSchema", () => {
  test("accepts an empty object when all fields are optional in update mode", () => {
    const result = updateVenueSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  test("accepts a small update with just a price change", () => {
    const result = updateVenueSchema.safeParse({ price: 300 });
    expect(result.success).toBe(true);
  });
});
