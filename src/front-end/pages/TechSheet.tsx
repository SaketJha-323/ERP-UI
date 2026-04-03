import { useState } from "react";
import { useParams } from "react-router-dom";

type TechItem = {
  id: number;
  material: string;
  make: string;
  fileName: string;
  fileUrl: string;
};

export default function TechSheet() {
  const { id } = useParams();

  // material → makes mapping
  const materialOptions: Record<string, string[]> = {
    Pipe: ["Astral", "Supreme", "Prince"],
    Valve: ["L&T", "Kirloskar"],
    Pump: ["Grundfos", "KSB"],
  };

  const [material, setMaterial] = useState("");
  const [make, setMake] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [list, setList] = useState<TechItem[]>([]);

  const handleUpload = () => {
    if (!material || !make || !file) return;

    const newItem: TechItem = {
      id: Date.now(),
      material,
      make,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    };

    setList([...list, newItem]);

    // reset
    setMaterial("");
    setMake("");
    setFile(null);
  };

  return (
    <div>
      <h2>Technical Data Sheet - Project {id}</h2>

      {/* FORM */}
      <div className="card p-3 mb-4">
        <div className="row">
          {/* Material */}
          <div className="col-md-4">
            <label>Material</label>
            <select
              className="form-select"
              value={material}
              onChange={(e) => {
                setMaterial(e.target.value);
                setMake(""); // reset make
              }}
            >
              <option value="">Select Material</option>
              {Object.keys(materialOptions).map((mat) => (
                <option key={mat}>{mat}</option>
              ))}
            </select>
          </div>

          {/* Make */}
          <div className="col-md-4">
            <label>Make</label>
            <select
              className="form-select"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              disabled={!material}
            >
              <option value="">Select Make</option>
              {material &&
                materialOptions[material].map((m) => (
                  <option key={m}>{m}</option>
                ))}
            </select>
          </div>

          {/* File Upload */}
          <div className="col-md-4">
            <label>Upload PDF</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <button className="btn btn-primary mt-3" onClick={handleUpload}>
          Upload
        </button>
      </div>

      {/* LIST TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Material</th>
            <th>Make</th>
            <th>File</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.material}</td>
              <td>{item.make}</td>

              <td>{item.fileName}</td>

              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => window.open(item.fileUrl, "_blank")}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
