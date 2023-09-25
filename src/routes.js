/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Loan Requests",
    icon: "tim-icons icon-paper",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Loan Under Review",
    icon: "tim-icons icon-alert-circle-exc",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Active Loans",
    icon: "tim-icons icon-money-coins",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Denied Loans",
    icon: "tim-icons icon-vector",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Loans History",
    icon: "tim-icons icon-book-bookmark",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Members",
    icon: "tim-icons icon-badge",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Loan Types and Requirements",
    icon: "tim-icons icon-notes",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: <Typography />,
    layout: "/admin",
  },

];
export default routes;
