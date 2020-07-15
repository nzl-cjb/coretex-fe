import { HttpMethod } from "./http-connect";

export enum PathName {
  VEHICLE_DELETE = "VEHICLE_DELETE",
  VEHICLE_GET_ALL = "VEHICLE_GET_ALL",
  VEHICLE_GET_SINGLE = "VEHICLE_GET_SINGLE",
  VEHICLE_POST = "VEHICLE_POST",
  VEHICLE_PUT = "VEHICLE_PUT",
}

export interface ApiEndpoint {
  name: string;
  host?: string;
  path: string;
  method: HttpMethod;
}

export const ApiEndpoints: ApiEndpoint[] = [
  {
    name: PathName.VEHICLE_DELETE,
    method: HttpMethod.DELETE,
    path: "/api/vehicle/{_id}",
  },
  {
    name: PathName.VEHICLE_GET_ALL,
    method: HttpMethod.GET,
    path: "/api/vehicle",
  },
  {
    name: PathName.VEHICLE_GET_SINGLE,
    method: HttpMethod.GET,
    path: "/api/vehicle/{_id}",
  },
  {
    name: PathName.VEHICLE_POST,
    method: HttpMethod.POST,
    path: "/api/vehicle",
  },
  {
    name: PathName.VEHICLE_PUT,
    method: HttpMethod.PUT,
    path: "/api/vehicle/{_id}",
  },
];
