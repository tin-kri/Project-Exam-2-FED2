import { describe, test, expect } from "vitest";
import {
  createVenueSchema,
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
