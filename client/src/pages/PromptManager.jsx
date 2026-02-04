import { useEffect, useState } from "react";
import api from "../services/api";
import { getRole } from "../utils/auth";

import ChannelSidebar from "../components/ChannelSidebar";
import PromptTypeTabs from "../components/PromptTypeTabs";
import PromptEditor from "../components/PromptEditor";

const PromptManager = () => {
  const role = getRole();

  const [prompts, setPrompts] = useState([]);
  const [channel, setChannel] = useState("");
  const [type, setType] = useState("");

  const [promptText, setPromptText] = useState("");
  const [aiModel, setAiModel] = useState("chatgpt");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    api.get("/prompts").then(res => setPrompts(res.data));
  }, []);

  const channels = [...new Set(prompts.map(p => p.channelName))];

  const types = [
    ...new Set(
      prompts
        .filter(p => p.channelName === channel)
        .map(p => p.promptType)
    )
  ];

  const filteredPrompts = prompts.filter(
    p => p.channelName === channel && p.promptType === type
  );

  const savePrompt = async () => {
    const payload = {
      channelName: channel,
      promptType: type,
      promptText,
      aiModel
    };

    if (editId) {
      await api.put(`/prompts/${editId}`, payload);
    } else {
      await api.post("/prompts", payload);
    }

    setPromptText("");
    setEditId(null);

    const res = await api.get("/prompts");
    setPrompts(res.data);
  };

  const editPrompt = (p) => {
    setEditId(p._id);
    setPromptText(p.promptText);
    setAiModel(p.aiModel);
  };

  const deletePrompt = async (id) => {
    await api.delete(`/prompts/${id}`);
    setPrompts(prompts.filter(p => p._id !== id));
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <ChannelSidebar
        channels={channels}
        selected={channel}
        onSelect={(c) => {
          setChannel(c);
          setType("");
        }}
      />

      <main className="flex-1 p-6">
        {channel && (
          <PromptTypeTabs
            types={types}
            selected={type}
            onSelect={setType}
          />
        )}

        {channel && type && (
          <PromptEditor
            promptText={promptText}
            setPromptText={setPromptText}
            aiModel={aiModel}
            setAiModel={setAiModel}
            onSave={savePrompt}
            prompts={filteredPrompts}
            onEdit={editPrompt}
            onDelete={deletePrompt}
            role={role}
          />
        )}
      </main>
    </div>
  );
};

export default PromptManager;
