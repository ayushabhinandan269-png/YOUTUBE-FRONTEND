import { useEffect, useState } from "react";
import api from "../services/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/user/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(res => setHistory(res.data))
    .catch(() => {});
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Watch History</h1>

      {history.length === 0 && (
        <p className="text-gray-500">No history yet.</p>
      )}

      <ul className="space-y-3">
        {history.map((h, index) => (
          <li key={index} className="border p-3 rounded">
            ▶ {h.videoId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;


