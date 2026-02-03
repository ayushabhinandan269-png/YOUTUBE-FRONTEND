import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // 🔐 LOGIN
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.username);
        setUser(res.data.username);

        navigate("/");
      } else {
        // 📝 REGISTER
        await api.post("/auth/register", {
          username: form.username,
          email: form.email,
          password: form.password
        });

        alert("Registered successfully! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
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
            placeholder="Full name"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Sign in" : "Register"}
        </button>
      </form>

      <p className="text-center text-sm mt-6">
        {isLogin ? (
          <>
            Don’t have an account?{" "}
            <span
              onClick={() => setIsLogin(false)}
              className="text-blue-600 cursor-pointer"
            >
              Create one
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setIsLogin(true)}
              className="text-blue-600 cursor-pointer"
            >
              Sign in
            </span>
          </>
        )}
      </p>
    </div>
  </div>
  );
}

export default Auth;
