/* istanbul ignore file */
import React, { useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import {
  RouteProperties,
  PageDefinitions,
} from "services/routes/page-definitions";

interface Props {
  routes?: RouteProperties[];
}

export const create = (routes: RouteProperties[]): JSX.Element[] =>
  routes.map((eachRoute: RouteProperties, index: number) => (
    <Route key={index} {...eachRoute} />
  ));

export const PageRoutes: React.FC<Props> = (props: Props) => {
  const { routes } = props;
  const routeElements = useMemo(() => create(routes!), [routes]);

  return <Switch>{routeElements}</Switch>;
};

PageRoutes.defaultProps = {
  routes: PageDefinitions.ROUTES,
};
