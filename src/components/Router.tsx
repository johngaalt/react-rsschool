import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Character from "../pages/Character";
import NotFound from "../pages/NotFound";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/character/:id" element={<Character />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
