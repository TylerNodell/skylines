import Dashboard from "views/Dashboard/Dashboard.jsx";

import UserProfile from "views/Pages/UserProfile.jsx";

import pagesRoutes from "./pages.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Image from "@material-ui/icons/Image";

// import ContentPaste from "@material-ui/icons/ContentPaste";


var pages = [
  {
    path: "/user-page",
    name: "User Profile",
    mini: "UP",
    component: UserProfile
  }
].concat(pagesRoutes);

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    collapse: true,
    path: "-page",
    name: "Pages",
    state: "openPages",
    icon: Image,
    views: pages
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
