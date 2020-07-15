import { Landing } from "features/landing";
import { RouteProps } from "react-router";
import { URLs } from "./urls";
import { ViewAllVehicles } from "features/vehicles/view-all";
import { EditVehicle } from "features/vehicles/edit";
import { CreateVehicle } from "features/vehicles/create";

export interface RouteProperties extends RouteProps {
  path: string | Array<string>;
  title: string;
  keywords: string;
  description: string;
}

// ====================================================
// Routes configuration
// ====================================================
export class PageDefinitions {
  public static readonly DEFAULT_TITLE_PREFIX = "";
  public static readonly DEFAULT_TITLE_SUFFIX = "";
  public static readonly DEFAULT_TITLE = "";
  public static readonly DEFAULT_META_DESCRIPTION = "";
  public static readonly DEFAULT_META_KEYWORDS = "";

  public static readonly ROUTES: RouteProperties[] = [
    {
      path: URLs.DEFAULT,
      component: ViewAllVehicles,
      description: "",
      exact: true,
      keywords: "",
      title: "Home Page",
    },
    {
      path: URLs.VEHICLES,
      component: ViewAllVehicles,
      description: "",
      exact: true,
      keywords: "",
      title: "All Vehicles",
    },
    {
      path: URLs.VEHICLES_CREATE,
      component: CreateVehicle,
      description: "",
      exact: true,
      keywords: "",
      title: "Create Vehicle",
    },
    {
      path: `${URLs.VEHICLES_EDIT}/:_id`,
      component: EditVehicle,
      description: "",
      exact: true,
      keywords: "",
      title: "Edit Vehicle",
    },
  ];
}
