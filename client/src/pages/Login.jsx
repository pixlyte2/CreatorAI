// import { useState } from "react";
// import api from "../services/api";
// import { saveAuth } from "../utils/auth";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await api.post("/auth/login", form);

//       const { token, role } = res.data;

//       // ✅ Save token + role
//       saveAuth(token, role);

//       // ✅ ROLE-BASED REDIRECT
//       if (role === "admin") {
//         navigate("/admin/dashboard");
//       } else if (role === "content_manager") {
//         navigate("/content/dashboard");
//       } else if (role === "viewer") {
//         navigate("/viewer/dashboard");
//       } else {
//         // fallback safety
//         navigate("/");
//       }

//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-slate-800 p-6 rounded w-80"
//       >
//         <h2 className="text-2xl mb-4 text-center">Login</h2>

//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="w-full mb-3 p-2 rounded bg-slate-700"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 p-2 rounded bg-slate-700"
//           onChange={handleChange}
//           required
//         />

//         <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded transition">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;





