interface AmenitiesItem {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

interface AmenitiesFieldProps {
  meta: AmenitiesItem;
  error?: string | null;
  onChange: (name: keyof AmenitiesItem, value: boolean) => void;
}
const amenities: { key: keyof AmenitiesItem; label: string }[] = [
  { key: "wifi", label: "WiFi is available" },
  { key: "parking", label: "Parking is available" },
  { key: "breakfast", label: "Breakfast is available" },
  { key: "pets", label: "Pets are allowed" },
];

export default function AmenitiesField({
  meta,
  error,
  onChange,
}: AmenitiesFieldProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 font-semibold">Amenities</legend>

      {amenities.map(({ key, label }) => (
        <div key={key} className=" flex items-center gap-2">
          <input
            id={key}
            type="checkbox"
            name={key}
            checked={meta[key]}
            onChange={(e) => onChange(key, e.target.checked)}
            className="h-4 w-4  accent-sky-500"
          />
          <label key={key} htmlFor={key} className="cursor-pointer select-none">
            {label}
          </label>
        </div>
      ))}

      {error && (
        <span role="alert" className="text-sm text-destructive">
          {error}
        </span>
      )}
    </fieldset>
  );
}
