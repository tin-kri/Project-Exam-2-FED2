import { holidazeFetch } from "@/api/base";
import type { CreateVenueResponse } from "../types/venueManagement.types";
import type { CreateVenueValues } from "../schema/venueManagementSchema";

export function createVenue(values: CreateVenueValues): Promise<CreateVenueResponse> {
    return holidazeFetch("venues", {
        method: "POST",
        body: JSON.stringify(values)
    })
}

