import LoginPage from "views/Pages/LoginPage.jsx";
import DisplayPage from "views/Pages/DisplayPage.jsx";

// @material-ui/icons
import Fingerprint from "@material-ui/icons/Fingerprint";

const pagesRoutes = [
  {
    path: "/pages/jchang",
    name: "Display Page",
    short: "Display",
    mini: "DP",
    component: DisplayPage
  },
  {
    path: "/pages/login",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    redirect: true,
    path: "/pages",
    pathTo: "/pages/login",
    name: "Login"
  }
];

export default pagesRoutes;
