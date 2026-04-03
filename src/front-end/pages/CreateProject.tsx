export default function CreateProject() {
  return (
    <div>
      <h2>Create Project</h2>

      <input className="form-control mb-2" placeholder="Project Name" />
      <input className="form-control mb-2" placeholder="Client" />

      <button className="btn btn-primary">Save</button>
    </div>
  );
}
