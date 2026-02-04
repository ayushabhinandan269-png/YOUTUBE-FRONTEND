import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await api.get("/users/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(res.data);
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Watch History</h2>

      {history.map((item, i) => (
        <Link
          key={i}
          to={`/video/${item.videoId}`}
          className="block p-3 border rounded mb-2 hover:bg-gray-100"
        >
          Watched video ID: {item.videoId}
        </Link>
      ))}
    </div>
  );
}

export default History;

