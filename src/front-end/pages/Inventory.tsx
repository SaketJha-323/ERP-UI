import { useState } from "react";
import { useParams } from "react-router-dom";

type Item = {
  id: number;
  material: string;
  used: number;
  total: number;
};

export default function Inventory() {
  const { id } = useParams();

  const [items, setItems] = useState<Item[]>([
    { id: 1, material: "Pipe", used: 20, total: 100 },
  ]);

  const handleChange = <K extends keyof Item>(
    index: number,
    field: K,
    value: Item[K],
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addRow = () => {
    setItems([...items, { id: Date.now(), material: "", used: 0, total: 0 }]);
  };

  const deleteRow = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Inventory - Project {id}</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Material</th>
            <th style={{ width: "15%" }}>Used</th>
            <th style={{ width: "20%" }}>Remaining</th>
            <th style={{ width: "20%" }}>Total</th>
            <th style={{ width: "15%" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => {
            const remaining = item.total - item.used;

            return (
              <tr key={item.id}>
                {/* Material */}
                <td>
                  <input
                    className="form-control"
                    value={item.material}
                    onChange={(e) =>
                      handleChange(index, "material", e.target.value)
                    }
                  />
                </td>

                {/* Used */}
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.used}
                    onChange={(e) =>
                      handleChange(index, "used", Number(e.target.value))
                    }
                  />
                </td>

                {/* Remaining (AUTO) */}
                <td>
                  <strong>{remaining >= 0 ? remaining : 0}</strong>
                </td>

                {/* Total */}
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.total}
                    onChange={(e) =>
                      handleChange(index, "total", Number(e.target.value))
                    }
                  />
                </td>

                {/* Actions */}
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteRow(index)}
                  >
                    −
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="btn btn-primary" onClick={addRow}>
        + Add Material
      </button>
    </div>
  );
}
