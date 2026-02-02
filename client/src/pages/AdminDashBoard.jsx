import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import ManageUsers from "../components/ManageUsers";
import ManagePrompts from "../components/ManagePrompts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-800 p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">CreatorAI</h2>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`block w-full text-left px-3 py-2 rounded ${
              activeTab === "dashboard" ? "bg-slate-700" : "hover:bg-slate-700"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`block w-full text-left px-3 py-2 rounded ${
              activeTab === "users" ? "bg-slate-700" : "hover:bg-slate-700"
            }`}
          >
            Manage Users
          </button>

          <button
            onClick={() => setActiveTab("prompts")}
            className={`block w-full text-left px-3 py-2 rounded ${
              activeTab === "prompts" ? "bg-slate-700" : "hover:bg-slate-700"
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

        {/* CONTENT SWITCH */}
        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 p-6 rounded">
                <h3 className="text-slate-300">Total Users</h3>
                <p className="text-3xl font-bold mt-2">—</p>
              </div>

              <div className="bg-slate-800 p-6 rounded">
                <h3 className="text-slate-300">Total Prompts</h3>
                <p className="text-3xl font-bold mt-2">—</p>
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
                Manage users, prompts, and company workspace here.
              </p>
            </div>
          </>
        )}

        {activeTab === "users" && <ManageUsers />}
        {activeTab === "prompts" && <ManagePrompts />}
      </main>
    </div>
  );
};

export default AdminDashboard;
