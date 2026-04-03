import { useParams } from "react-router-dom";
import { useState } from "react";

type BOQItem = {
  id: number;
  description: string;
  qty: number;
  unit: string;
  rate: number;
};

export default function BOQ() {
  const { id } = useParams();

  const [items, setItems] = useState<BOQItem[]>([
    { id: 1, description: "", qty: 0, unit: "", rate: 0 },
  ]);

  const handleChange = <K extends keyof BOQItem>(
    index: number,
    field: K,
    value: BOQItem[K],
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // ✅ Add row BELOW selected row
  const addRowBelow = (index: number) => {
    const newRow: BOQItem = {
      id: Date.now(),
      description: "",
      qty: 0,
      unit: "",
      rate: 0,
    };

    const updated = [...items];
    updated.splice(index + 1, 0, newRow);
    setItems(updated);
  };

  const moveRowUp = (index: number) => {
    if (index === 0) return;

    const updated = [...items];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setItems(updated);
  };

  const moveRowDown = (index: number) => {
    if (index === items.length - 1) return;

    const updated = [...items];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setItems(updated);
  };

  // ✅ Delete row
  const deleteRow = (index: number) => {
    if (items.length === 1) return;
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // ✅ Total
  const total = items.reduce((sum, item) => sum + item.qty * item.rate, 0);

  return (
    <div>
      <h2>BOQ - Project {id}</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Sr</th>
            <th style={{ width: "35%" }}>Description</th>
            <th style={{ width: "10%" }}>Qty</th>
            <th style={{ width: "10%" }}>Unit</th>
            <th style={{ width: "15%" }}>Rate</th>
            <th style={{ width: "15%" }}>Amount</th>
            <th style={{ width: "10%" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>

              {/* Description (BIG) */}
              <td>
                <input
                  className="form-control"
                  value={item.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </td>

              {/* Qty (SMALL) */}
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={item.qty}
                  onChange={(e) =>
                    handleChange(index, "qty", Number(e.target.value))
                  }
                />
              </td>

              {/* Unit (SMALL) */}
              <td>
                <input
                  className="form-control"
                  value={item.unit}
                  onChange={(e) => handleChange(index, "unit", e.target.value)}
                />
              </td>

              {/* Rate (MEDIUM) */}
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={item.rate}
                  onChange={(e) =>
                    handleChange(index, "rate", Number(e.target.value))
                  }
                />
              </td>

              {/* Amount (AUTO BIG) */}
              <td>
                <strong>{item.qty * item.rate}</strong>
              </td>

              {/* Actions */}
              <td>
                <div className="d-flex flex-wrap gap-1">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => moveRowUp(index)}
                  >
                    ↑
                  </button>

                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => moveRowDown(index)}
                  >
                    ↓
                  </button>

                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => addRowBelow(index)}
                  >
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

      {/* TOTAL */}
      <div className="text-end">
        <h4>Total: {total}</h4>
      </div>
    </div>
  );
}
