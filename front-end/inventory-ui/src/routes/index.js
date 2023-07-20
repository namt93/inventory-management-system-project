import Rack from "~/pages/Rack";
import User from "~/pages/User";
import Document from "~/pages/Document";
import Login from "~/pages/Login";
import Setting from "~/pages/Setting";
import RackStatus from "~/pages/RackStatus";
import DocumentAdd from "~/pages/PageAdd/DocumentAdd";
import RackAdd from "~/pages/PageAdd/RackAdd";

const publicRoutes = [
  { path: "/", component: Rack },
  { path: "/racks/rack/:id", component: RackStatus },
  { path: "/add-document", component: DocumentAdd },
  { path: "/add-rack", component: RackAdd },
  { path: "/documents", component: Document },
  { path: "/documents/search?query=:query", component: Document },
  { path: "/documents/:id", component: Document },
  { path: "/users", component: User },
  { path: "/setting", component: Setting },
  { path: "/login", component: Login, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
