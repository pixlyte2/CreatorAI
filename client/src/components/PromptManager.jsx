import { useEffect, useState } from "react";
import api from "../utils/api";

export default function PromptManager() {
  const [text, setText] = useState("");
  const [prompts, setPrompts] = useState([]);

  const load = async () => {
    const res = await api.get("/prompts");
    setPrompts(res.data);
  };

  const create = async () => {
    await api.post("/prompts", { promptText: text });
    setText("");
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <h3>Prompts</h3>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={create}>Add</button>

      {prompts.map(p => <div key={p._id}>{p.promptText}</div>)}
    </>
  );
}
