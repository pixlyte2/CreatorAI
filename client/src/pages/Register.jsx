import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register-admin", form);
      alert("Admin & Company created. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded w-80">
        <h2 className="text-2xl mb-4 text-center">Register Company</h2>

        <input name="companyName" placeholder="Company Name"
          className="w-full mb-3 p-2 rounded bg-slate-700"
          onChange={handleChange} />

        <input name="name" placeholder="Admin Name"
          className="w-full mb-3 p-2 rounded bg-slate-700"
          onChange={handleChange} />

        <input name="email" type="email" placeholder="Admin Email"
          className="w-full mb-3 p-2 rounded bg-slate-700"
          onChange={handleChange} />

        <input name="password" type="password" placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-slate-700"
          onChange={handleChange} />

        <button className="w-full bg-blue-600 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
