import PageWrapper from "@/components/layout/PageWrapper";
import VenueForm from "../components/VenueForm";
import { useEditVenue } from "../hooks/useEditVenue";
import type { CreateVenueValues } from "../schema/venueManagementSchema";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useVenue } from "@/features/venues/hooks/useVenue";
export default function EditVenuePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { handleEditVenue, isLoading, error } = useEditVenue();

  const { venue, isLoading: isVenueLoading, error: venueError } = useVenue(id);

  if (isVenueLoading)
    return (
      <PageWrapper>
        <p className="text-center text-grey-900">Loading...</p>
      </PageWrapper>
    );

  if (venueError)
    return (
      <PageWrapper>
        <p role="alert" className="text-center text-destructive">
          {venueError}
        </p>
      </PageWrapper>
    );

  if (!venue)
    return (
      <PageWrapper>
        <p className="text-center text-grey-900">Venue not found.</p>
      </PageWrapper>
    );

      const initialValues = {
    ...venue,
     meta: {
      wifi: venue.meta?.wifi ?? false,
      parking: venue.meta?.parking ?? false,
      breakfast: venue.meta?.breakfast ?? false,
      pets: venue.meta?.pets ?? false,
    },
  };

  async function handleEdit(values: CreateVenueValues) {
    const updated = await handleEditVenue(id!, values);
    if (updated) {
      toast.success("Venue updated successfully!");
      navigate(`/manage-venues/${updated.id}`);
    }
  }

  return (
    <PageWrapper>
      <VenueForm
        title="Edit Venue"
        initialValues={initialValues}
        onSubmit={handleEdit}
        isLoading={isLoading}
        error={error}
        submitLabel="Update Venue"
        loadingLabel="Updating..."
      />
    </PageWrapper>
  );
}
