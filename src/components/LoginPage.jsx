import { useState } from "react";
import { Lock, Settings } from "lucide-react";
import axios from "axios";

// API Base URL - connect to backend
const API_URL = "http://localhost:5000/api";

// API Helper
const api = {
  login: async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
  },
};

// --- Login Page Component ---
export default function LoginPage({ onLogin }) {
  const [email] = useState("elayabarathiedison@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await api.login(email, password);
      onLogin(result.admin);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-white/10 w-full max-w-md overflow-hidden">
        <div className="bg-slate-900 p-8 text-center ">
          <div className="mb-4">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center">
              <Settings size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Garage Manager</h1>
          <p className="text-slate-400 text-sm mt-1">
            Garage Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 text-center">
            Admin Login
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Email</label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="email"
                className="w-full pl-10 p-3 border border-slate-200 rounded-xl bg-slate-100 text-slate-600"
                value={email}
                readOnly
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="password"
                className="w-full pl-10 p-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
