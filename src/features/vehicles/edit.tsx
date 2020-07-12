import React, { useState, useEffect } from "react";
import { VehicleForm } from "./form";
import { Vehicle } from "./types";
import { VehiclesAPIService } from "services/api/vehicles-service";
import { match } from "react-router";
import { URLs } from "services/routes/urls";

interface Props {
  match: match<any> | null;
  history: any;
}

export const EditVehicle: React.FC<Props> = (props: Props) => {
  const { match, history } = props;
  const Id = match?.params?.Id;
  const [isLoading, setIsLoading] = useState(true);
  const [vehicle, setVehicle] = useState<Vehicle>();

  useEffect(() => {
    VehiclesAPIService.getInstance()
      .getSingleVehicle({ Id })
      .then(function (response) {
        setVehicle(response);
        setIsLoading(false);
      });
  }, []);

  function updateVehicle(payload: Vehicle): void {
    VehiclesAPIService.getInstance()
      .putVehicle(payload)
      .then(function () {
        history.push(URLs.VEHICLES);
        window.location.reload(true);
      });
  }

  return (
    <div className="vms-vehicles">
      {!isLoading && (
        <VehicleForm
          buttonText={"Update"}
          initialValues={vehicle!}
          submitCallback={updateVehicle}
        />
      )}
    </div>
  );
};
