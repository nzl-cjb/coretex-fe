import * as HttpStatus from "http-status-codes";
import { http } from "core/http/global";
import { resources } from "core/http/api-resource-builder";
import { PathName } from "core/http/api-endpoints";
import { APIServiceHelper } from "services/api/api-service-helper";
import { Vehicle } from "features/vehicles/types";
import { VehiclePayload } from "types/vehicles";
import qs from "qs";

export class VehiclesAPIService {
  private static instance: VehiclesAPIService;

  private constructor() {}

  public static getInstance(): VehiclesAPIService {
    if (!VehiclesAPIService.instance) {
      VehiclesAPIService.instance = new VehiclesAPIService();
    }

    return VehiclesAPIService.instance;
  }

  public async deleteVehicle(payload: Vehicle): Promise<any> {
    const path = resources.getPath(PathName.VEHICLE_DELETE, {
      _id: payload._id,
    });
    const response = await http.delete<Vehicle>(path);
    if (response.code !== HttpStatus.NO_CONTENT) {
      APIServiceHelper.throwResponseError<Vehicle>(response);
    }
    return response;
  }

  public async getAllVehicles(): Promise<Vehicle[]> {
    const path = resources.getPath(PathName.VEHICLE_GET_ALL);
    const response = await http.get<Vehicle[]>(path);
    if (!response.success && response.code !== HttpStatus.OK) {
      APIServiceHelper.throwResponseError<Vehicle[]>(response);
    }
    return response.data!;
  }

  public async getSingleVehicle(payload: VehiclePayload): Promise<any> {
    const path = resources.getPath(PathName.VEHICLE_GET_SINGLE, payload);
    const response = await http.get<Vehicle>(path, payload);
    if (!response.success && response.code !== HttpStatus.OK) {
      APIServiceHelper.throwResponseError<Vehicle>(response);
    }
    return response.data;
  }

  public async postVehicle(payload: Vehicle): Promise<any> {
    const path = resources.getPath(PathName.VEHICLE_POST, payload);
    const payloadAsString = `"${qs.stringify(payload)}"`;
    const response = await http.post<string, Vehicle>(path, payloadAsString);
    if (!response.success && response.code !== HttpStatus.CREATED) {
      APIServiceHelper.throwResponseError<Vehicle>(response);
    }
    return response.data;
  }

  public async putVehicle(payload: Vehicle): Promise<any> {
    const path = resources.getPath(PathName.VEHICLE_PUT, payload);
    const payloadAsString = `"${qs.stringify(payload)}"`;
    const response = await http.put<string, Vehicle>(path, payloadAsString);
    if (
      !response.success &&
      response.code !== HttpStatus.OK &&
      response.code !== HttpStatus.NO_CONTENT
    ) {
      APIServiceHelper.throwResponseError<Vehicle>(response);
    }
    return response.data;
  }
}
