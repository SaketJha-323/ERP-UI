import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <img src=""></img>
      <ul className="nav flex-column">
        <li>
          <Link className="nav-link text-white" to="/home">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="nav-link text-white" to="/projects">
            Project List
          </Link>
        </li>
      </ul>
    </div>
  );
}
