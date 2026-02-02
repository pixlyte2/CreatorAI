import { useEffect, useState } from "react";
import api from "../services/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "content_manager",
  });

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/users", form);
    setForm({
      name: "",
      email: "",
      password: "",
      role: "content_manager",
    });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

      {/* CREATE USER */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          placeholder="Name"
          className="w-full p-2 bg-slate-700 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          placeholder="Email"
          className="w-full p-2 bg-slate-700 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full p-2 bg-slate-700 rounded"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <select
          className="w-full p-2 bg-slate-700 rounded"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="content_manager">Content Manager</option>
          <option value="viewer">Viewer</option>
        </select>

        <button className="bg-blue-600 px-4 py-2 rounded">
          Create User
        </button>
      </form>

      {/* USER LIST */}
      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u._id}
            className="flex justify-between bg-slate-800 p-3 rounded"
          >
            <span>
              {u.name} ({u.role})
            </span>

            <button
              onClick={() => deleteUser(u._id)}
              className="text-red-400"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
