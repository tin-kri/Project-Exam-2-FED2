import { z } from "zod";

const mediaSchema = z.object({
  url: z.url("Must be a valid URL").min(1, "Image URL is required"),
  alt: z.string().optional(),
});

export const createVenueSchema = z.object({
  name: z
    .string()
    .min(1, "Venue name is required")
    .max(100, "Name must be less than 100 characters"),

  description: z.string().min(1, "Description is required"),

  price: z.coerce
    .number({ error: "Price must be a number" })
    .min(0, "Price must be at least 0")
    .max(10000, "Price can not be higher than 10000"),

  maxGuests: z.coerce
    .number({ error: "Max guests must be a number" })
    .min(1, "Must allow at least 1 guest")
    .max(100, "Max guests cannot exceed 100"),

  rating: z.coerce.number().min(0).max(5).optional(),

  media: z.array(mediaSchema).optional(),

  meta: z
    .object({
      wifi: z.boolean().default(false),
      parking: z.boolean().default(false),
      breakfast: z.boolean().default(false),
      pets: z.boolean().default(false),
    })
    .default({
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    }),

  location: z
    .object({
      address: z.string().optional().nullable(),
      city: z.string().optional().nullable(),
      zip: z.string().optional().nullable(),
      country: z.string().optional().nullable(),
      continent: z.string().optional().nullable(),
      lat: z.coerce.number().min(-90).max(90).optional(),
      lng: z.coerce.number().min(-180).max(180).optional(),
    })
    .optional(),
});

export type CreateVenueValues = z.infer<typeof createVenueSchema>;