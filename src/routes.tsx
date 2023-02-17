import { element } from "prop-types";
import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const EmployeeList = React.lazy(
  () => import("./views/pages/Employee/ListEmployee")
);
const EmployeeDetails = React.lazy(
  () => import("./views/pages/Employee/DetailsEmployee")
);
const EmployeeEdit = React.lazy(
  () => import("./views/pages/Employee/EditEmployee")
);
const LoginPage = React.lazy(() => import("./views/pages/login/Login"));

const routes = [
  { path: "/Login", name: "Login", element: LoginPage },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/employeelist", name: "Employee List", element: EmployeeList },
  {
    path: "/employeedetails",
    name: "Employee Details",
    element: EmployeeDetails,
  },
  { path: "/employeeedit", name: "Edit Employee", element: EmployeeEdit },
];

export default routes;
