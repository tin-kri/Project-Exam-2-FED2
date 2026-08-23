import PageWrapper from "@/components/layout/PageWrapper";
import VenueForm from "../components/VenueForm";
import { useCreateVenue } from "../hooks/useCreateVenue";
import type { CreateVenueValues } from "../schema/venueManagementSchema";
 import { useNavigate } from "react-router-dom";
import {  toast } from 'sonner'

export default function CreateVenuePage() {

const navigate= useNavigate();
const {handleCreateVenue, isLoading, error} = useCreateVenue();

 async function handleSubmit(values: CreateVenueValues) {
    const venue = await handleCreateVenue(values);
    if (venue) {
      toast.success("Successfully created new venue")
      navigate(`/manage-venues/${venue.id}`);
    }
  }



  return (
    <PageWrapper>

   <VenueForm 
   onSubmit={handleSubmit}  
   isLoading= {isLoading}
   error={error}/> 
    
    </PageWrapper>
  );
}

