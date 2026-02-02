import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        CreatorAI
      </h1>

      <p className="text-slate-300 mb-8 text-center max-w-md">
        Multi-company SaaS platform to manage AI prompts
        securely across teams and channels.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition"
        >
          Register
        </button>

        <button
          onClick={() => navigate("/login")}
          className="border border-white hover:bg-white hover:text-slate-900 px-6 py-3 rounded-md font-medium transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
