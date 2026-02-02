import { useEffect, useState } from "react";
import api from "../services/api";
import { getRole } from "../utils/auth";

const ManagePrompts = () => {
  const role = getRole(); // admin / content_manager

  const [allPrompts, setAllPrompts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [form, setForm] = useState({
    aiModel: "chatgpt",
    promptText: "",
  });

  const [editId, setEditId] = useState(null);

  // 🔹 Fetch prompts (company-wise)
  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/prompts");
      setAllPrompts(res.data || []);
    } catch (err) {
      console.error("Fetch prompts failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  // 🔹 CHANNELS (must exist first)
  const channels = [...new Set(allPrompts.map(p => p.channelName))];

  // 🔹 PROMPT TYPES (channel-wise)
  const promptTypes = [
    ...new Set(
      allPrompts
        .filter(p => p.channelName === selectedChannel)
        .map(p => p.promptType)
    )
  ];

  // 🔹 PROMPTS (channel + type)
  const filteredPrompts = allPrompts.filter(
    p =>
      p.channelName === selectedChannel &&
      p.promptType === selectedType
  );

  // 🔹 CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedChannel || !selectedType) {
      alert("Select Channel and Prompt Type");
      return;
    }

    const payload = {
      channelName: selectedChannel,
      promptType: selectedType,
      aiModel: form.aiModel,
      promptText: form.promptText,
    };

    try {
      if (editId) {
        await api.put(`/prompts/${editId}`, payload);
      } else {
        await api.post("/prompts", payload);
      }

      setForm({ aiModel: "chatgpt", promptText: "" });
      setEditId(null);
      fetchPrompts();
    } catch {
      alert("Failed to save prompt");
    }
  };

  // 🔹 EDIT
  const startEdit = (p) => {
    setEditId(p._id);
    setSelectedChannel(p.channelName);
    setSelectedType(p.promptType);
    setForm({
      aiModel: p.aiModel,
      promptText: p.promptText,
    });
  };

  // 🔹 DELETE (admin only)
  const deletePrompt = async (id) => {
    if (!window.confirm("Delete this prompt?")) return;
    await api.delete(`/prompts/${id}`);
    fetchPrompts();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Channel-wise Prompt Manager
      </h2>

      {/* CHANNEL SELECT */}
      <select
        className="w-full p-2 bg-slate-700 rounded mb-3"
        value={selectedChannel}
        onChange={(e) => {
          setSelectedChannel(e.target.value);
          setSelectedType("");
        }}
      >
        <option value="">Select Channel</option>
        {channels.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>

      {/* PROMPT TYPE SELECT */}
      {selectedChannel && (
        <select
          className="w-full p-2 bg-slate-700 rounded mb-4"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select Prompt Type</option>
          {promptTypes.map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>
      )}

      {/* PROMPT MANAGER */}
      {selectedChannel && selectedType && (
        <>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800 p-4 rounded mb-6 space-y-3"
          >
            <textarea
              placeholder="Enter Prompt Text"
              className="w-full p-2 bg-slate-700 rounded"
              rows="4"
              value={form.promptText}
              onChange={(e) =>
                setForm({ ...form, promptText: e.target.value })
              }
              required
            />

            <select
              className="w-full p-2 bg-slate-700 rounded"
              value={form.aiModel}
              onChange={(e) =>
                setForm({ ...form, aiModel: e.target.value })
              }
            >
              <option value="chatgpt">ChatGPT</option>
              <option value="gemini">Gemini</option>
            </select>

            <button className="bg-green-600 px-4 py-2 rounded">
              {editId ? "Update Prompt" : "Save Prompt"}
            </button>
          </form>

          {/* PROMPT LIST */}
          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : (
            <div className="space-y-3">
              {filteredPrompts.map(p => (
                <div
                  key={p._id}
                  className="bg-slate-800 p-4 rounded flex justify-between"
                >
                  <div>
                    <p className="text-slate-300 text-sm">
                      {p.promptText}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Model: {p.aiModel}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-blue-400"
                    >
                      Edit
                    </button>

                    {role === "admin" && (
                      <button
                        onClick={() => deletePrompt(p._id)}
                        className="text-red-400"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {filteredPrompts.length === 0 && (
                <p className="text-slate-400">
                  No prompts for this channel & type
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManagePrompts;
