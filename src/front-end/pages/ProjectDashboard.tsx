import { useParams, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProjectDashboard() {
  const { id } = useParams();

  // 🔹 dummy progress %
  const progress = 65;

  // 🔹 dummy gantt data
  const ganttData = [
    { task: "Planning", duration: 3 },
    { task: "Design", duration: 5 },
    { task: "Execution", duration: 10 },
    { task: "Testing", duration: 4 },
  ];

  // 🔹 DATE LOGIC (IMPORTANT: inside component, before return)
  const startDate = new Date("2026-04-01");
  const endDate = new Date("2026-04-30");
  const today = new Date();

  const totalDays =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  const elapsedDays =
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  const expectedProgress = Math.min(
    Math.max((elapsedDays / totalDays) * 100, 0),
    100,
  );

  let status = "On Track";
  let color = "#198754";

  if (progress < expectedProgress - 15) {
    status = "Delayed";
    color = "#dc3545";
  } else if (progress < expectedProgress) {
    status = "Slow Progress";
    color = "#ffc107";
  }

  return (
    <div>
      <h2>Project Dashboard - {id}</h2>

      {/* 🔹 SMART PROGRESS CARD */}
      <div className="card p-3 mt-3 shadow-sm border-0">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0 text-muted">Project Progress</h6>

          <span className="badge" style={{ backgroundColor: color }}>
            {status}
          </span>
        </div>

        <div className="d-flex align-items-end gap-2">
          <h2 className="mb-0 fw-bold">{progress}%</h2>
          <small className="text-muted">completed</small>
        </div>

        <div
          className="mt-3"
          style={{
            height: "8px",
            background: "#e9ecef",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: color,
              borderRadius: "10px",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        <div className="mt-3 d-flex justify-content-between text-muted small">
          <span>Start: {startDate.toLocaleDateString()}</span>
          <span>End: {endDate.toLocaleDateString()}</span>
        </div>

        <div className="text-muted small mt-1">
          Expected: {Math.round(expectedProgress)}%
        </div>
      </div>

      {/* 🔹 Gantt Chart */}
      <div className="card p-3 mt-4">
        <h5>Work Timeline (Gantt)</h5>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={ganttData}>
            <XAxis type="number" />
            <YAxis dataKey="task" type="category" />
            <Tooltip />
            <Bar dataKey="duration" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 MODULES */}
      <div className="mt-4">
        {/* DETAILS */}
        <div className="card p-3 mb-3">
          <h5>Details</h5>

          <div className="row g-2">
            <div className="col-md-3">
              <Link
                to={`/projects/${id}/wo-dashboard`}
                className="btn btn-outline-primary btn-sm w-100"
              >
                Work Orders
              </Link>
            </div>
          </div>
        </div>

        {/* RESOURCES */}
        <div className="card p-3 mb-3">
          <h5>Resources</h5>

          <div className="row g-2">
            <div className="col-md-3">
              <Link
                to={`/projects/${id}/boq`}
                className="btn btn-outline-secondary btn-sm w-100"
              >
                BOQ
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to={`/projects/${id}/inventory`}
                className="btn btn-outline-secondary btn-sm w-100"
              >
                Inventory
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to={`/projects/${id}/techsheet`}
                className="btn btn-outline-secondary btn-sm w-100"
              >
                Tech Sheet
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to={`/projects/${id}/shopdrawing`}
                className="btn btn-outline-secondary btn-sm w-100"
              >
                Shop Drawing
              </Link>
            </div>
          </div>
        </div>

        {/* PLANNING */}
        <div className="card p-3">
          <h5>Planning</h5>

          <div className="row g-2">
            <div className="col-md-3">
              <Link
                to={`/projects/${id}/material`}
                className="btn btn-outline-dark btn-sm w-100"
              >
                Material Req
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to={`/projects/${id}/po`}
                className="btn btn-outline-dark btn-sm w-100"
              >
                Purchase Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
