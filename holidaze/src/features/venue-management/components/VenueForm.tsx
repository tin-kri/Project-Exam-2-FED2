import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  createVenueSchema,
  type CreateVenueValues,
} from "../schema/venueManagementSchema";
import FormField from "@/components/ui/FormField";

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
  maxGuests: 0,
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
    const checked = (e.target as HTMLInputElement).checked;

    if (name.startsWith("meta.")) {
      const key = name.split(".")[1];
      setValues((prev) => ({
        ...prev,
        meta: { ...prev.meta, [key]: checked },
      }));
    } else if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setValues((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else if (name === "media.url") {
      setValues((prev) => ({
        ...prev,
        media: [{ ...prev.media?.[0], url: value }],
      }));
    } else if (name === "media.alt") {
      setValues((prev) => ({
        ...prev,
        media: [
          { ...prev.media?.[0], url: prev.media?.[0]?.url ?? "", alt: value },
        ],
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }

    // clear error on change
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
      // focus first error field
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
        />
        {/* city */}
        <FormField
          label="City"
          name="location.city"
          value={values.location?.city ?? ""}
          onChange={handleChange}
          error={errors.description}
        />
        {/* country */}
        <FormField
          label="Country"
          name="location.country"
          value={values.location?.country ?? ""}
          onChange={handleChange}
          error={errors.description}
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
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 font-semibold">Amenities</legend>
          {(
            [
              { name: "meta.parking", label: "Parking is available" },
              { name: "meta.pets", label: "Pets are allowed" },
              { name: "meta.breakfast", label: "Breakfast is served" },
              { name: "meta.wifi", label: "Wifi is available" },
            ] as const
          ).map(({ name, label }) => (
            <div key={name} className="flex items-center gap-2">
              <input
                id={name}
                name={name}
                type="checkbox"
                checked={
                  values.meta?.[
                    name.split(".")[1] as keyof typeof values.meta
                  ] ?? false
                }
                onChange={handleChange}
                className="h-4 w-4 accent-sky-500"
              />
              <label htmlFor={name} className="cursor-pointer select-none">
                {label}
              </label>
            </div>
          ))}
        </fieldset>

        {/* images */}
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Images</p>

          <div className="flex flex-col gap-1">
            <label htmlFor="media.url">Image URL</label>
            <input
              id="media.url"
              name="media.url"
              type="url"
              value={values.media?.[0]?.url ?? ""}
              onChange={handleChange}
              aria-invalid={!!errors["media.0.url"]}
              aria-describedby={
                errors["media.0.url"] ? "media-url-error" : undefined
              }
              className="w-full rounded-sm border border-grey-200 bg-white px-4 py-2"
            />
            {errors["media.0.url"] && (
              <span
                id="media-url-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors["media.0.url"]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="media.alt">Image Alt Text</label>
            <input
              id="media.alt"
              name="media.alt"
              type="text"
              value={values.media?.[0]?.alt ?? ""}
              onChange={handleChange}
              className="w-full rounded-sm border border-grey-200 bg-white px-4 py-2"
            />
          </div>
        </div>

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
