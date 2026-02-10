import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Email and password are required");
      return;
    }

    if (!isLogin && !form.username) {
      alert("Username is required");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        }); 
         console.log("LOGIN RESPONSE:", res.data);

        // ✅ FIX: store full user object from backend
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setUser(res.data.user);
        navigate("/");
      } else {
        await api.post("/auth/register", form);
        alert("Registered successfully! Please sign in.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Sign in" : "Create your account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Please wait..." : isLogin ? "Sign in" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isLogin ? (
            <span
              onClick={() => setIsLogin(false)}
              className="text-blue-600 cursor-pointer"
            >
              Create account
            </span>
          ) : (
            <span
              onClick={() => setIsLogin(true)}
              className="text-blue-600 cursor-pointer"
            >
              Sign in
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default Auth;



