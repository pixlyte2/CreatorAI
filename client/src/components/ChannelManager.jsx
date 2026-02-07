import { useEffect, useState } from "react";
import api from "../utils/api";

export default function ChannelManager() {
  const [name, setName] = useState("");
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await api.get("/channels");
    setChannels(res.data);
  };

  const create = async () => {
    if (!name.trim()) return alert("Channel name required");

    setLoading(true);
    await api.post("/channels", { name });
    setName("");
    setLoading(false);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Channel Manager
      </h3>

      {/* Create Channel */}
      <div className="flex gap-2 mb-4">
        <input
          value={name}
          placeholder="Enter channel name"
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={create}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Channel List */}
      <div>
        {channels.length === 0 ? (
          <p className="text-sm text-gray-500">
            No channels created yet
          </p>
        ) : (
          <ul className="space-y-2">
            {channels.map((c) => (
              <li
                key={c._id}
                className="px-4 py-2 border rounded-lg flex justify-between items-center hover:bg-gray-50"
              >
                <span className="text-gray-700 font-medium">
                  {c.name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
