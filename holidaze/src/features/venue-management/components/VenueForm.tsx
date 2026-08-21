import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  createVenueSchema,
  type CreateVenueValues,
} from "../schema/venueManagementSchema";
import FormField from "@/components/ui/FormField";
import ImageField from "@/components/ui/ImageField";
import AmenitiesField from "@/components/ui/AmenitiesField";
type VenueFormErrors = Partial<Record<string, string>>;

interface VenueFormProps {
  onSubmit: (values: CreateVenueValues) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  initialValues?: Partial<CreateVenueValues>;
  submitLabel?: string;
}

const defaultValues: CreateVenueValues = {
  name: "",
  description: "",
  price: 0,
  maxGuests: 1,
  media: [{ url: "", alt: "" }],
  meta: { wifi: false, parking: false, breakfast: false, pets: false },
  location: { city: "", country: "" },
};

export default function VenueForm({
  onSubmit,
  isLoading,
  error,
  initialValues,
  submitLabel = "Create Venue Listing",
}: VenueFormProps) {
  const [values, setValues] = useState<CreateVenueValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState<VenueFormErrors>({});

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = e.target;
    // const checked = (e.target as HTMLInputElement).checked;

    // if (name.startsWith("meta.")) {
    //   const key = name.split(".")[1];
    //   setValues((prev) => ({
    //     ...prev,
    //     meta: { ...prev.meta, [key]: checked },
    //   }));
    // } else
    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setValues((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: type === "number" || name === "rating" ? Number(value) : value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = createVenueSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: VenueFormErrors = {};
      result.error.issues.forEach((error) => {
        const path = error.path.join(".");
        if (!fieldErrors[path]) fieldErrors[path] = error.message;
      });
      setErrors(fieldErrors);

      const firstKey = Object.keys(fieldErrors)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    await onSubmit(result.data);
  }

  return (
    <section className="rounded-sm bg-bg-card px-6 py-8">
      <h1 className="mb-6 font-serif text-2xl font-bold text-navy-800">
        Create a Venue
      </h1>

      {error && (
        <p role="alert" className="mb-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 text-navy-800"
      >
        {/* name */}
        <FormField
          label="Venue name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        {/* description */}
        <FormField
          label="Description"
          name="description"
          rows={5}
          multiline
          value={values.description}
          onChange={handleChange}
          error={errors.description}
          required
        />
        {/* city */}
        <FormField
          label="City"
          name="location.city"
          value={values.location?.city ?? ""}
          onChange={handleChange}
          error={errors["location.city"]}
        />
        {/* country */}
        <FormField
          label="Country"
          name="location.country"
          value={values.location?.country ?? ""}
          onChange={handleChange}
          error={errors["location.country"]}
        />
        {/* price */}
        <FormField
          label="Price per night"
          name="price"
          type="number"
          value={values.price}
          onChange={handleChange}
          error={errors.price}
          required
        />
        {/* guests */}
        <FormField
          label="Number of guests"
          name="maxGuests"
          type="number"
          value={values.maxGuests}
          onChange={handleChange}
          error={errors.maxGuests}
          required
        />

        {/* rating */}
        <div className="flex flex-col gap-1">
          <label htmlFor="rating" className="font-semibold">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={values.rating ?? 0}
            onChange={handleChange}
            className="w-20 rounded-sm border border-grey-200 bg-white px-3 py-2 text-sm"
          >
            {[0, 1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* amenities */}
        <AmenitiesField
          meta={values.meta}
          onChange={(name, value) =>
            setValues((prev) => ({
              ...prev,
              meta: { ...prev.meta, [name]: value },
            }))
          }
        />
        
        {/* image */}
        <ImageField
          media={
            (values.media as { url: string; alt: string }[]) ?? [
              { url: "", alt: "" },
            ]
          }
          onChange={(media) => setValues((prev) => ({ ...prev, media }))}
          error={errors["media.0.url"]}
        />

        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Creating..." : submitLabel}
        </Button>
      </form>
    </section>
  );
}
