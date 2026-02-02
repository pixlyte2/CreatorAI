import ManagePrompts from "../components/ManagePrompts";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const ContentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Content Manager Dashboard
        </h1>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <ManagePrompts />
    </div>
  );
};

export default ContentDashboard;
