import { useEffect, useState } from "react";
import api from "../utils/api";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer"
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // load users
  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  // create user
  const submit = async () => {
    try {
      setLoading(true);
      await api.post("/users/content", form);

      alert("User created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "viewer"
      });

      loadUsers();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || "Failed to create user");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* LEFT – CREATE USER */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Create User
        </h3>

        {/* Name */}
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            value={form.name}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Role</label>
          <select
            value={form.role}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="viewer">Viewer</option>
            <option value="content_manager">Content Manager</option>
          </select>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </div>

      {/* RIGHT – USER LIST */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Users List
        </h3>

        {users.length === 0 ? (
          <p className="text-gray-500 text-sm">No users created yet</p>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u._id}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>

                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
