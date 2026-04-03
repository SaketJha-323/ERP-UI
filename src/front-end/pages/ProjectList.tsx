import { Link } from "react-router-dom";

type Project = {
  id: number;
  name: string;
  status: string;
};

type Props = {
  showTitle?: boolean;
};

export default function ProjectList({ showTitle = true }: Props) {
  const projects: Project[] = [
    { id: 1, name: "Project A", status: "Active" },
    { id: 2, name: "Project B", status: "Completed" },
  ];

  return (
    <div>
      {showTitle && <h2>Projects</h2>}

      <Link to="/projects/new" className="btn btn-success mb-3">
        + Create Project
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>
                <Link to={`/projects/${p.id}`}>{p.name}</Link>
              </td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
