const PromptEditor = ({
  promptText,
  setPromptText,
  aiModel,
  setAiModel,
  onSave,
  prompts,
  onEdit,
  onDelete,
  role
}) => {
  return (
    <>
      <textarea
        className="w-full p-3 bg-slate-700 rounded mb-3"
        rows="4"
        placeholder="Enter prompt text"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
      />

      <select
        className="w-full p-2 bg-slate-700 rounded mb-3"
        value={aiModel}
        onChange={(e) => setAiModel(e.target.value)}
      >
        <option value="chatgpt">ChatGPT</option>
        <option value="gemini">Gemini</option>
      </select>

      <button
        onClick={onSave}
        className="bg-green-600 px-4 py-2 rounded mb-6"
      >
        Save Prompt
      </button>

      <div className="space-y-3">
        {prompts.map((p) => (
          <div
            key={p._id}
            className="bg-slate-800 p-4 rounded flex justify-between"
          >
            <p className="text-sm">{p.promptText}</p>

            <div className="flex gap-3">
              <button
                onClick={() => onEdit(p)}
                className="text-blue-400"
              >
                Edit
              </button>

              {role === "admin" && (
                <button
                  onClick={() => onDelete(p._id)}
                  className="text-red-400"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PromptEditor;
