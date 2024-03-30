import React, { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./Router.consts";


const Router: FC = () => {

  const router = createBrowserRouter(routes);

  return<RouterProvider router={router} />;
};

export default Router;
