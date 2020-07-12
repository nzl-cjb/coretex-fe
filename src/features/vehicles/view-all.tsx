import React, { useState, useEffect } from "react";
import { Vehicle } from "./types";
import { VehiclesAPIService } from "services/api/vehicles-service";
import { Redirect, Router } from "react-router";
import { URLs } from "services/routes/urls";

interface Props {
  history: any;
}

export const ViewAllVehicles: React.FC<Props> = (props: Props) => {
  const { history } = props;
  const vehicleRows: JSX.Element[] = [];
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    VehiclesAPIService.getInstance()
      .getAllVehicles()
      .then(function (response) {
        setVehicles(response);
      });
  }, []);

  function deleteVehicle(payload: Vehicle): void {
    VehiclesAPIService.getInstance()
      .deleteVehicle(payload)
      .then(function () {
        history.replace(URLs.VEHICLES);
        window.location.reload(true);
      });
  }

  vehicles.forEach((vehicle) => {
    const { Id, NumberPlate, Speed, Latitude, Longitude } = vehicle;

    vehicleRows.push(
      <tr key={NumberPlate}>
        <td>
          <a href={`${URLs.VEHICLES_EDIT}/${Id}`}>{NumberPlate}</a>
        </td>
        <td>{Speed}kph</td>
        <td>{Latitude}</td>
        <td>{Longitude}</td>
        <td>
          <button
            onClick={() => {
              deleteVehicle(vehicle);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="vms-vehicles">
      <table>
        <tbody>
          <tr>
            <th>Number Plate</th>
            <th>Speed</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th></th>
          </tr>
          {vehicleRows}
        </tbody>
      </table>
      <a href={URLs.VEHICLES_CREATE}>Create Vehicle</a>
    </div>
  );
};
