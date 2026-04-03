import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function WorkOrder() {
  const { id } = useParams(); // project id
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectName: "",
    clientName: "",
    woNumber: "",
    date: "",
    address: "",
    gst: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", form);
    console.log("File:", file);

    // later → send to backend

    navigate(`/projects/${id}/wo-dashboard`);
  };

  return (
    <div>
      <h2>Create Work Order (Project {id})</h2>

      <div className="card p-3">
        <input
          className="form-control mb-2"
          name="projectName"
          placeholder="Project Name"
          value={`Project ${id}`}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="clientName"
          placeholder="Client Name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="woNumber"
          placeholder="Work Order Number"
          onChange={handleChange}
        />

        <input
          type="date"
          className="form-control mb-2"
          name="date"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="gst"
          placeholder="GST Number"
          onChange={handleChange}
        />

        {/* File Upload */}
        <input
          type="file"
          className="form-control mb-3"
          accept=".pdf,.xls,.xlsx,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button className="btn btn-success" onClick={handleSubmit}>
          Save Work Order
        </button>
      </div>
    </div>
  );
}
