import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import ProjectList from "./ProjectList";

export default function Home() {
  const barData = [
    { name: "Jan", purchase: 4000, selling: 2400 },
    { name: "Feb", purchase: 3000, selling: 1398 },
    { name: "Mar", purchase: 2000, selling: 9800 },
  ];

  const pieData = [
    { name: "Negotiation", value: 3 },
    { name: "Running", value: 5 },
    { name: "Completed", value: 2 },
  ];

  const COLORS = ["#ffc107", "#0d6efd", "#198754"];

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Charts */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Purchase vs Selling</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="purchase" fill="#0d6efd" />
                <Bar dataKey="selling" fill="#198754" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h5>Project Status</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="card p-3">
        <h5>Projects</h5>
        <ProjectList showTitle={false} />
      </div>
    </div>
  );
}
