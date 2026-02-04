import { useEffect, useState } from "react";
import api from "../services/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/user/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res => setHistory(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Watch History</h1>
      {history.map((h, i) => (
        <p key={i}>{h.videoId}</p>
      ))}
    </div>
  );
}

export default History;

