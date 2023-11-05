import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Character from "../pages/Character";
import NotFound from "../pages/NotFound";
import Sidebar from "./Sidebar";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route index element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
