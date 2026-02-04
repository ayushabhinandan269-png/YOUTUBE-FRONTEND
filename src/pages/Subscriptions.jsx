import { useEffect, useState } from "react";
import api from "../services/api";

function Subscriptions() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get("/user/subscriptions", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(res => setSubs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Subscriptions</h1>

      {subs.map((s, i) => (
        <p key={i} className="border p-2 rounded mb-2">
          {s.channelName}
        </p>
      ))}
    </div>
  );
}

export default Subscriptions;

