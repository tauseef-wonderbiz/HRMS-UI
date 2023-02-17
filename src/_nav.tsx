import React from "react";
import CIcon from "@coreui/icons-react";
import { cilHome, cilPuzzle, cilSpeedometer, cilUser } from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  // {
  //   component: CNavItem,
  //   name: "Dashboard",
  //   to: "/dashboard",
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: "info",
  //     text: "NEW",
  //   },
  // },
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "Employee",
  },
  {
    component: CNavGroup,
    name: "Employee",
    to: "/employeelist",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Employee List",
        to: "/employeelist",
      },
    ],
  },
  {
    component: CNavTitle,
    name: "Leave",
  },
  {
    component: CNavGroup,
    name: "Leave",
    to: "/leavelist",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Leave List",
        to: "/leavelist",
      },
    ],
  },
  // {
  //   component: CNavTitle,
  //   name: "Extras",
  // },
  // {
  //   component: CNavGroup,
  //   name: "Pages",
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Login",
  //       to: "/login",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Register",
  //       to: "/register",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Error 404",
  //       to: "/404",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Error 500",
  //       to: "/500",
  //     },
  //   ],
  // },
];

export default _nav;
