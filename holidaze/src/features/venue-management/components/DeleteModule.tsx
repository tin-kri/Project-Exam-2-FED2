import { Button } from "@/components/vendor/button";
import { useDeleteVenue } from "../hooks/useDeleteVenue";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { VenueApiData } from "@/features/venues/types/venue.types";

interface DeleteModuleProps {
  venue: VenueApiData;
  onClose: () => void;
}

export default function DeleteModule({ venue, onClose }: DeleteModuleProps) {
  const { handleDeleteVenue, isLoading, error } = useDeleteVenue();
  const navigate = useNavigate();

  async function handleConfirm() {
    const success = await handleDeleteVenue(venue.id);
    if (success) {
      toast.success("Successfully deleted venue.");
      onClose();
      navigate("/");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-800/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-md rounded-lg bg-white px-6 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="delete-dialog-title"
          className="font-serif text-2xl font-bold text-navy-800"
        >
          Delete Venue
        </h2>

        <p className="mt-3 text-sm text-grey-900">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{venue.name}</span>?
        </p>

        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="default"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
            aria-busy={isLoading}
            
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
