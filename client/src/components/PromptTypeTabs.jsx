const PromptTypeTabs = ({ types, selected, onSelect }) => {
  return (
    <div className="flex gap-2 mb-4">
      {types.map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          className={`px-4 py-2 rounded ${
            selected === t
              ? "bg-blue-600"
              : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default PromptTypeTabs;
