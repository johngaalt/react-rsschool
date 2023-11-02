import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Character from "../pages/Character";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/character/:id" element={<Character />} />
    </Routes>
  );
}
