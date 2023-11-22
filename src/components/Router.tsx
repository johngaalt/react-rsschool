import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Details from "../../pages/Details";
import NotFound from "../../pages/NotFound";
import Sidebar from "./Sidebar";
import { Paths } from "./Router.types";

export default function Router() {
  return (
    <Routes>
      <Route path={Paths.Home} element={<Sidebar />}>
        <Route index element={<Home />} />
        <Route path={`${Paths.Details}/:id`} element={<Details />} />
      </Route>
      <Route path={Paths.NotFound} element={<NotFound />} />
    </Routes>
  );
}
