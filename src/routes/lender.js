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
import LoanHistory from "views/loan-history";

import LoanRequests from "views/loan-requests";
import PendingLoans from "views/pending-loans";
import Typography from "views/Typography.js";
import UserProfile from "views/profile";

var routes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/lender",
  },
  {
    path: "/loan-requests",
    name: "Loan Requests",
    icon: "tim-icons icon-paper",
    component: <LoanRequests />,
    layout: "/lender",
  },
  {
    path: "/pending-loans",
    name: "Loan Under Review",
    icon: "tim-icons icon-alert-circle-exc",
    component: <PendingLoans />,
    layout: "/lender",
  },
  {
    path: "/active-loans",
    name: "Active Loans",
    icon: "tim-icons icon-money-coins",
    component: <ActiveLoans />,
    layout: "/lender",
  },
  // {
  //   path: "/denied-loans",
  //   name: "Denied Loans",
  //   icon: "tim-icons icon-vector",
  //   component: <DeniedLoans />,
  //   layout: "/lender",
  // },
  {
    path: "/loan-history/",
    name: "Loans History",
    icon: "tim-icons icon-book-bookmark",
    component: <LoanHistory />,
    layout: "/lender",
    // children: [
    //   {
    //     path: "all",
    //     name: "All Loans",
    //     component: <AllLoans />,
    //     layout: "/lender",
    //   },
    //   {
    //     path: "approved",
    //     name: "Approved Loans",
    //     component: <ApprovedLoans />,
    //     layout: "/lender",
    //   },
    //   {
    //     path: "denied",
    //     name: "Denied Loans",
    //     component: <DeniedLoans />,
    //     layout: "/lender",
    //   },
    // ]
  },
  {
    path: "/borrowers",
    name: "Members",
    icon: "tim-icons icon-badge",
    component: <Borrowers />,
    layout: "/lender",
  },
  {
    path: "/dashboard",
    name: "Loan Types and Requirements",
    icon: "tim-icons icon-notes",
    component: <Dashboard />,
    layout: "/lender",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: <Icons />,
    layout: "/lender",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/lender",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: <Typography />,
    layout: "/lender",
  },

];
export default routes;
