import { useParams, Link } from "react-router-dom";

export default function WODashboard() {
  const { id } = useParams();

  // mock data (later from API)
  const woList = [
    { id: 1, number: "WO-001", client: "ABC Ltd", date: "2026-04-01" },
    { id: 2, number: "WO-002", client: "XYZ Pvt Ltd", date: "2026-04-02" },
  ];

  return (
    <div>
      <h2>Work Orders - Project {id}</h2>

      <Link to={`/projects/${id}/wo`} className="btn btn-primary mb-3">
        + Create Work Order
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>WO Number</th>
            <th>Client</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {woList.map((wo) => (
            <tr key={wo.id}>
              <td>{wo.number}</td>
              <td>{wo.client}</td>
              <td>{wo.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
