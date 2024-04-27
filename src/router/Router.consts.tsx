import React from "react";
import { RouteObject } from "react-router-dom";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { MenuItem } from "./Router.types";
import { Employee, Overview } from "../views";

export const routes: RouteObject[] = [
  {
    children: [
      {
        element: <Employee />,
        path: "/employees"
      }
    ],
    element: <Overview />,
    path: "/"
  }
];

const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], path?: string): MenuItem =>
  ({ children, icon, key, label, path } as MenuItem);

export const items: MenuItem[] = [
  getItem("Human Resources", "sub1", <UserOutlined />, [
    getItem("Employees", "1", undefined, undefined, "/employees")
  ]),
  getItem("Dev Ops", "sub2", <TeamOutlined />, [getItem("Teams", "2", undefined, undefined, "/teams")])
];

