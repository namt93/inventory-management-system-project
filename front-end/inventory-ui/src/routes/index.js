import Rack from "~/pages/Rack";
import User from "~/pages/User";
import Document from "~/pages/Document";
import Login from "~/pages/Login";
import Setting from "~/pages/Setting";
import RackStatus from "~/pages/RackStatus";

const publicRoutes = [
  { path: "/", component: Rack },
  { path: "/racks/rack/:id", component: RackStatus },
  { path: "/documents", component: Document },
  { path: "/documents/search?query=:query", component: Document },
  { path: "/documents/:id", component: Document },
  { path: "/users", component: User },
  { path: "/setting", component: Setting },
  { path: "/login", component: Login, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
