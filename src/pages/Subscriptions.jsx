import { useEffect, useState } from "react";
import api from "../services/api";

function Subscriptions() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get("/user/subscriptions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(res => setSubs(res.data))
    .catch(() => {});
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>

      {subs.length === 0 && (
        <p className="text-gray-500">No subscriptions yet.</p>
      )}

      <ul className="space-y-3">
        {subs.map((s, index) => (
          <li
            key={s.channelName + index}
            className="p-3 border rounded"
          >
            📺 {s.channelName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Subscriptions;
