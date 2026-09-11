import { useState } from "react";
import useChangeAvatar from "../hooks/useChangeAvatar";
import { Button } from "@/components/vendor/button";

interface AvatarModalProps {
  currentUrl?: string;
  currentAlt?: string;
  onClose: () => void;
}

export default function AvatarModal({
  currentUrl,
  currentAlt,
  onClose,
}: AvatarModalProps) {
  const [url, setUrl] = useState(currentUrl ?? "");
  const [alt, setAlt] = useState(currentAlt ?? "");
  const { handleChangeAvatar, isLoading, error } = useChangeAvatar();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const success = await handleChangeAvatar(url, alt);
    if (success) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-800/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="avatar-modal-title"
        className="w-full max-w-md rounded-lg bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="avatar-modal-title"
          className="font-serif text-2xl font-bold text-navy-800"
        >
          Change Avatar
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="avatar-url"
              className="text-sm font-medium text-navy-800"
            >
              Image URL
            </label>
            <input
              id="avatar-url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              aria-invalid={!!error}
              aria-describedby={error ? "avatar-error" : undefined}
              className="rounded-md border border-grey-200 bg-white px-4 py-3 text-sm text-grey-900 outline-none placeholder:text-grey-200 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20 aria-invalid:border-red-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="avatar-alt-text"
              className="text-sm font-medium text-navy-800"
            >
              Alt text{" "}
              <span className="ml-1 text-xs font-normal text-grey-600">
                (optional)
              </span>
            </label>
            <input
              id="avatar-alt-text"
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="A meaningful description of your avatar image"
              aria-invalid={!!error}
              aria-describedby={error ? "avatar-error" : undefined}
              className="rounded-md border border-grey-200 bg-white px-4 py-3 text-sm text-grey-900 outline-none placeholder:text-grey-600 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20"
            />
          </div>

          {error && (
            <p
              id="avatar-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {error}
            </p>
          )}
          <div className="flex justify-end gap-3">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} variant="default">
              {isLoading ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
