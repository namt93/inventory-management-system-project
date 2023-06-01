import Rack from "~/pages/Rack";
import User from "~/pages/User";
import Login from "~/pages/Login";

const publicRoutes = [
  { path: "/", component: Rack },
  { path: "/user", component: User },
  { path: "/login", component: Login, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
