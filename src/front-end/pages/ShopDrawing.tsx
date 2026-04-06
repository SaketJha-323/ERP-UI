import { useState } from "react";
import { useParams } from "react-router-dom";

type ShopRevision = {
  id: number;
  file: File;
  url: string;
  name: string;
};

type FloorItem = {
  id: number;
  floor: string;
  gfc: string;
  shop: string;
  status: string;
  clearance: string;
  work: string;
  dependency: string;

  gfcFile?: File | null;
  gfcUrl?: string;

  shopRevisions: ShopRevision[];
};

export default function ShopDrawing() {
  const { id } = useParams();

  const [floors, setFloors] = useState<FloorItem[]>([
    {
      id: 1,
      floor: "Ground Floor",
      gfc: "Pending",
      shop: "Not Prepared",
      status: "Pending",
      clearance: "Not Cleared",
      work: "Work in Progress",
      dependency: "",
      gfcFile: null,
      gfcUrl: "",
      shopRevisions: [],
    },
  ]);

  const [openFloor, setOpenFloor] = useState<number | null>(null);

  const handleChange = <K extends keyof FloorItem>(
    index: number,
    field: K,
    value: FloorItem[K],
  ) => {
    const updated = [...floors];
    updated[index][field] = value;
    setFloors(updated);
  };

  const deleteRevision = (floorIndex: number, revId: number) => {
    const updated = [...floors];

    updated[floorIndex].shopRevisions = updated[
      floorIndex
    ].shopRevisions.filter((rev) => rev.id !== revId);

    setFloors(updated);
  };

  const addRow = () => {
    setFloors([
      ...floors,
      {
        id: Date.now(),
        floor: "",
        gfc: "Pending",
        shop: "Not Prepared",
        status: "Pending",
        clearance: "Not Cleared",
        work: "Work on Hold",
        dependency: "",
        gfcFile: null,
        gfcUrl: "",
        shopRevisions: [],
      },
    ]);
  };

  const deleteRow = (index: number) => {
    if (floors.length === 1) return;
    setFloors(floors.filter((_, i) => i !== index));
  };

  // 🔹 GFC upload (single file)
  const handleGFCUpload = (index: number, file: File | null) => {
    const updated = [...floors];

    if (!file) {
      updated[index].gfcFile = null;
      updated[index].gfcUrl = "";
    } else {
      updated[index].gfcFile = file;
      updated[index].gfcUrl = URL.createObjectURL(file);
    }

    setFloors(updated);
  };

  // 🔹 Add Shop Revision
  const addShopRevision = (index: number, file: File | null) => {
    if (!file) return;

    const updated = [...floors];

    const newRevision: ShopRevision = {
      id: Date.now(),
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    };

    updated[index].shopRevisions.push(newRevision);

    setFloors(updated);
  };

  return (
    <div>
      <h2>Shop Drawing - Project {id}</h2>

      {/* TABLE */}
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Floor</th>
            <th>GFC</th>
            <th>Shop Drawing</th>
            <th>Status</th>
            <th>Site Clearance</th>
            <th>Work Status</th>
            <th>Dependency</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {floors.map((item, index) => (
            <tr key={item.id}>
              <td>
                <input
                  className="form-control"
                  value={item.floor}
                  onChange={(e) => handleChange(index, "floor", e.target.value)}
                />
              </td>

              <td>
                <select
                  className="form-select"
                  value={item.gfc}
                  onChange={(e) => handleChange(index, "gfc", e.target.value)}
                >
                  <option>Received</option>
                  <option>Pending</option>
                </select>
              </td>

              <td>
                <select
                  className="form-select"
                  value={item.shop}
                  onChange={(e) => handleChange(index, "shop", e.target.value)}
                >
                  <option>Prepared</option>
                  <option>Not Prepared</option>
                </select>
              </td>

              <td>
                <select
                  className="form-select"
                  value={item.status}
                  onChange={(e) =>
                    handleChange(index, "status", e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>Approved</option>
                </select>
              </td>

              <td>
                <select
                  className="form-select"
                  value={item.clearance}
                  onChange={(e) =>
                    handleChange(index, "clearance", e.target.value)
                  }
                >
                  <option>Cleared</option>
                  <option>Not Cleared</option>
                </select>
              </td>

              <td>
                <select
                  className="form-select"
                  value={item.work}
                  onChange={(e) => handleChange(index, "work", e.target.value)}
                >
                  <option>Work in Progress</option>
                  <option>On Hold</option>
                </select>
              </td>

              <td>
                <input
                  className="form-control"
                  value={item.dependency}
                  onChange={(e) =>
                    handleChange(index, "dependency", e.target.value)
                  }
                />
              </td>

              <td>
                <div className="d-flex gap-1">
                  <button className="btn btn-sm btn-success" onClick={addRow}>
                    +
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteRow(index)}
                  >
                    −
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary mb-4" onClick={addRow}>
        + Add Floor
      </button>

      {/* FLOOR FILE SECTION */}
      <div className="row g-2">
        {floors.map((item, index) => (
          <div className="col-md-3" key={item.id}>
            <button
              className="btn btn-outline-dark w-100"
              onClick={() =>
                setOpenFloor(openFloor === item.id ? null : item.id)
              }
            >
              {item.floor || "Unnamed Floor"}
            </button>

            {openFloor === item.id && (
              <div className="card p-2 mt-2">
                {/* GFC */}
                <div className="mb-2">
                  <strong>GFC:</strong>

                  {!item.gfcUrl ? (
                    <input
                      type="file"
                      className="form-control mt-1"
                      onChange={(e) =>
                        handleGFCUpload(index, e.target.files?.[0] || null)
                      }
                    />
                  ) : (
                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => window.open(item.gfcUrl, "_blank")}
                      >
                        View
                      </button>

                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleGFCUpload(index, null)}
                      >
                        Replace
                      </button>
                    </div>
                  )}
                </div>

                {/* SHOP DRAWING REVISIONS */}
                <div>
                  <strong>Shop Drawing (Revisions):</strong>

                  <input
                    type="file"
                    className="form-control mt-1"
                    onChange={(e) =>
                      addShopRevision(index, e.target.files?.[0] || null)
                    }
                  />

                  {item.shopRevisions.length > 0 && (
                    <div className="mt-2">
                      {item.shopRevisions.length > 0 && (
                        <div className="mt-2">
                          {item.shopRevisions.map((rev, i) => (
                            <div
                              key={rev.id}
                              className="d-flex justify-content-between align-items-center border p-1 mb-1"
                            >
                              <span>
                                Rev {i + 1} - {rev.name}
                                {i === item.shopRevisions.length - 1 && (
                                  <span className="badge bg-success ms-2">
                                    Latest
                                  </span>
                                )}
                              </span>

                              <div className="d-flex gap-1">
                                {/* VIEW */}
                                <button
                                  className="btn btn-sm btn-info"
                                  onClick={() => window.open(rev.url, "_blank")}
                                >
                                  View
                                </button>

                                {/* DELETE */}
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => deleteRevision(index, rev.id)}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
