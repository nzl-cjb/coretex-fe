import { Form, Formik } from "formik";
import React from "react";
import { TextInput } from "components/forms/text-input";
import { Vehicle } from "./types";

interface Props {
  buttonText: string;
  initialValues?: Vehicle;
  submitCallback: (payload: Vehicle) => void;
}

export const VehicleForm: React.FC<Props> = (props: Props) => {
  const { initialValues, submitCallback } = props;

  const defaultValues: Vehicle = {
    _id: "",
    Latitude: 0,
    Longitude: 0,
    NumberPlate: "",
    Speed: 0,
  };

  return (
    <div className="vms-vehicles">
      <div className="vms-form">
        <Formik
          initialValues={initialValues || defaultValues}
          onSubmit={submitCallback}
          validateOnBlur={false}
          render={({ handleChange }): JSX.Element => {
            return (
              <Form>
                <TextInput
                  id="vms-number-plate"
                  labelText="Number Plate: "
                  name="NumberPlate"
                  onChange={handleChange}
                  type="text"
                />
                <TextInput
                  id="vms-speed"
                  labelText="Speed: "
                  name="Speed"
                  onChange={handleChange}
                  type="number"
                />
                <TextInput
                  id="vms-latitude"
                  labelText="Latitude: "
                  name="Latitude"
                  onChange={handleChange}
                  type="number"
                />
                <TextInput
                  id="vms-longitude"
                  labelText="Longitude: "
                  name="Longitude"
                  onChange={handleChange}
                  type="number"
                />
                <button className="vms-button" type="submit">
                  Submit
                </button>
              </Form>
            );
          }}
        />
      </div>
    </div>
  );
};
