import PageWrapper from "@/components/layout/PageWrapper";
import VenueForm from "../components/VenueForm";
import { useCreateVenue } from "../hooks/useCreateVenue";
import type { CreateVenueValues } from "../schema/venueManagementSchema";
 import { useNavigate } from "react-router-dom";

export default function CreateVenuePage() {

const navigate= useNavigate();
const {handleCreateVenue, isLoading, error} = useCreateVenue();

 async function handleSubmit(values: CreateVenueValues) {
    const venue = await handleCreateVenue(values);
    if (venue) {
      navigate(`/venues/${venue.id}`);
    }
  }



  return (
    <PageWrapper>
      
    <h1>Create a venue</h1>
   <VenueForm 
   onSubmit={handleSubmit}  
   isLoading= {isLoading}
   error={error}/> 
    
    </PageWrapper>
  );
}

