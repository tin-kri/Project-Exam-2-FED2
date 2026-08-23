interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export default function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  required = false,
  placeholder,
  rows = 5,
  multiline = false,
}: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-semibold text-navy-800 ">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows ?? 5}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring aria-invalid:border-destructive resize-y"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className=" rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring aria-invalid:border-destructive"
        />
      )}
      {error && (
        <span id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </span>
      )}
    </div>
  );
}
