import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./front-end/pages/Login";
import Home from "./front-end/pages/Home";
import MainLayout from "./front-end/layout/MainLayout";

import ProjectList from "./front-end/pages/ProjectList";
import CreateProject from "./front-end/pages/CreateProject";
import ProjectDashboard from "./front-end/pages/ProjectDashboard";

import BOQ from "./front-end/pages/BOQ";
import TechSheet from "./front-end/pages/TechSheet";
import ShopDrawing from "./front-end/pages/ShopDrawing";

import WorkOrder from "./front-end/pages/WorkOrder";
import WODashboard from "./front-end/pages/WODashboard";
import Inventory from "./front-end/pages/Inventory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />

          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/new" element={<CreateProject />} />

          {/* PROJECT DASHBOARD */}
          <Route path="/projects/:id" element={<ProjectDashboard />} />

          {/* PROJECT MODULE ROUTES */}
          <Route path="/projects/:id/boq" element={<BOQ />} />
          <Route path="/projects/:id/techsheet" element={<TechSheet />} />
          <Route path="/projects/:id/shopdrawing" element={<ShopDrawing />} />
          <Route path="/projects/:id/inventory" element={<Inventory />} />
          <Route path="/projects/:id/wo" element={<WorkOrder />} />

          {/*Work Order & WO Dashboard*/}
          <Route path="/wo" element={<WorkOrder />} />
          <Route path="/projects/:id/wo-dashboard" element={<WODashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
