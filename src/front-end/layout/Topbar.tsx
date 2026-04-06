import { useNavigate, useLocation } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Back button logic
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/projects");
    }
  };

  // 🔹 Route → Title mapping
  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("/home")) return "Dashboard";
    if (path === "/projects") return "Projects";
    if (path.includes("/wo-dashboard")) return "Work Orders";
    if (path.includes("/boq")) return "BOQ";
    if (path.includes("/inventory")) return "Inventory";
    if (path.includes("/tech")) return "Technical Data Sheet";
    if (path.includes("/po")) return "Purchase Orders";
    if (path.includes("/material")) return "Material Requisition";
    if (path.includes("/shop")) return "Shop Drawing";

    return "Dashboard";
  };

  return (
    <div className="bg-light border-bottom px-3 py-2 d-flex align-items-center">
      {/* 🔹 Back Button */}
      <button
        className="btn btn-sm btn-outline-secondary me-3"
        onClick={handleBack}
      >
        Back
      </button>

      {/* 🔹 Page Title */}
      <h5 className="mb-0">{getTitle()}</h5>
    </div>
  );
}
