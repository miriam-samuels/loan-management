
import Borrowers from "views/borrowers";
import Dashboard from "views/dashboard";
import Icons from "views/Icons.js";
import LoanApplication from "views/loan-application";
import LoanHistory from "views/loan-history";
import Typography from "views/Typography.js";
import UserProfile from "views/profile";
import Application from "views/loan-history/application";
import Borrower from "views/borrowers/borrower";

const routes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/lender",
  },
  {
    path: "/loan-history/",
    name: "Applications",
    icon: "tim-icons icon-book-bookmark",
    component: <LoanHistory />,
    layout: "/lender",
  },
  {
    path: "/loan-history/:id/",
    name: "Application",
    icon: "tim-icons icon-book-bookmark",
    component: <Application />,
    layout: "/lender",
  },
  {
    path: "/borrowers",
    name: "Members",
    icon: "tim-icons icon-badge",
    component: <Borrowers />,
    layout: "/lender",
  },
  {
    path: "/borrowers/:id/",
    name: "Member",
    icon: "tim-icons icon-badge",
    component: <Borrower />,
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

export const sidebarRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/lender",
  },
  {
    path: "/loan-history/",
    name: "Applications",
    icon: "tim-icons icon-book-bookmark",
    component: <LoanHistory />,
    layout: "/lender",
  },
  {
    path: "/borrowers",
    name: "Members",
    icon: "tim-icons icon-badge",
    component: <Borrowers />,
    layout: "/lender",
  },
];

export default routes;


