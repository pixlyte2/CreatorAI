import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { logout } from "../utils/auth";
import ManageUsers from "../components/ManageUsers";
import ManagePrompts from "../components/ManagePrompts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");

  const [counts, setCounts] = useState({
    users: 0,
    prompts: 0,
  });

  // 🔹 Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔹 Fetch dashboard counts using existing APIs
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersRes = await api.get("/users");
        const promptsRes = await api.get("/prompts");

        setCounts({
          users: usersRes.data.length,
          prompts: promptsRes.data.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard counts", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-800 p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">CreatorAI</h2>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`block w-full text-left px-3 py-2 rounded ${
              activeTab === "dashboard"
                ? "bg-slate-700"
                : "hover:bg-slate-700"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`block w-full text-left px-3 py-2 rounded ${
              activeTab === "users"
                ? "bg-slate-700"
                : "hover:bg-slate-700"
            }`}
          >
            Manage Users
          </button>

          <button
            onClick={() => setActiveTab("prompts")}
            className={`block w-full text-left px-3 py-2 rounded ${
              activeTab === "prompts"
                ? "bg-slate-700"
                : "hover:bg-slate-700"
            }`}
          >
            Manage Prompts
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 p-6 rounded">
                <h3 className="text-slate-300">Total Users</h3>
                <p className="text-3xl font-bold mt-2">
                  {counts.users}
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded">
                <h3 className="text-slate-300">Total Prompts</h3>
                <p className="text-3xl font-bold mt-2">
                  {counts.prompts}
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded">
                <h3 className="text-slate-300">Company</h3>
                <p className="text-3xl font-bold mt-2">Active</p>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded">
              <h2 className="text-xl font-semibold mb-2">
                Welcome, Admin 👋
              </h2>
              <p className="text-slate-300">
                Manage users, prompts, and your company workspace
                from here.
              </p>
            </div>
          </>
        )}

        {/* USERS */}
        {activeTab === "users" && <ManageUsers />}

        {/* PROMPTS */}
        {activeTab === "prompts" && <ManagePrompts />}
      </main>
    </div>
  );
};

export default AdminDashboard;
