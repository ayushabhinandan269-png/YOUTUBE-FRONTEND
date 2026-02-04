import { useEffect, useState } from "react";
import api from "../services/api";

function Subscriptions() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get("/user/subscriptions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res => setSubs(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Subscriptions</h1>

      {subs.length === 0 && <p>No subscriptions yet</p>}

      {subs.map(s => (
        <p key={s}>{s}</p>
      ))}
    </div>
  );
}

export default Subscriptions;

