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
import ActiveLoans from "views/active-loans";
import Borrowers from "views/borrowers";
import Dashboard from "views/dashboard";
import Icons from "views/Icons.js";
import LoanApplication from "views/loan-application";
import LoanHistory from "views/loan-history";
import Typography from "views/Typography.js";
import UserProfile from "views/profile";
import Application from "views/loan-history/application";

const routes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/borrower",
  },
  {
    path: "/loan-history/",
    name: "Loans History",
    icon: "tim-icons icon-book-bookmark",
    component: <LoanHistory />,
    layout: "/borrower",
    // children: [
    //   {
    //     path: "all",
    //     name: "All Loans",
    //     component: <AllLoans />,
    //     layout: "/borrower",
    //   },
    //   {
    //     path: "approved",
    //     name: "Approved Loans",
    //     component: <ApprovedLoans />,
    //     layout: "/borrower",
    //   },
    //   {
    //     path: "denied",
    //     name: "Denied Loans",
    //     component: <DeniedLoans />,
    //     layout: "/borrower",
    //   },
    // ]
  },
  {
    path: "/loan-history/:id/",
    name: "Application",
    icon: "tim-icons icon-book-bookmark",
    component: <Application />,
    layout: "/borrower",
  },
  {
    path: "/loan-application",
    name: "Apply For Loan",
    icon: "tim-icons icon-paper",
    component: <LoanApplication />,
    layout: "/borrower",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: <Icons />,
    layout: "/borrower",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/borrower",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: <Typography />,
    layout: "/borrower",
  },

];

export const sidebarRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/borrower",
  },
  {
    path: "/loan-history/",
    name: "Loans History",
    icon: "tim-icons icon-book-bookmark",
    component: <LoanHistory />,
    layout: "/borrower",
  },
  {
    path: "/loan-application",
    name: "Apply For Loan",
    icon: "tim-icons icon-paper",
    component: <LoanApplication />,
    layout: "/borrower",
  },
];

export default routes;
