import React, { useState, useEffect } from "react";
import { VehicleForm } from "./form";
import { Vehicle } from "./types";
import { VehiclesAPIService } from "services/api/vehicles-service";
import { match } from "react-router";
import { URLs } from "services/routes/urls";

interface Props {
  history: any;
}

export const CreateVehicle: React.FC<Props> = (props: Props) => {
  const { history } = props;

  function createVehicle(payload: Vehicle): void {
    VehiclesAPIService.getInstance()
      .postVehicle(payload)
      .then(function () {
        history.push(URLs.VEHICLES);
        window.location.reload(true);
      });
  }

  return (
    <div className="vms-vehicles">
      <VehicleForm buttonText={"Create"} submitCallback={createVehicle} />
    </div>
  );
};
