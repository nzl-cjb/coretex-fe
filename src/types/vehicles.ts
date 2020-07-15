import { Vehicle } from "features/vehicles/types";

export interface AllVehiclesResponse {
  data: Vehicle[];
}

export interface VehiclePayload {
  _id: string;
}
