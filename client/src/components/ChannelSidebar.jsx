const ChannelSidebar = ({ channels, selected, onSelect }) => {
  return (
    <aside className="w-64 bg-slate-800 p-4">
      <h2 className="text-lg font-bold mb-4">Channels</h2>

      <ul className="space-y-2">
        {channels.map((c) => (
          <li key={c}>
            <button
              onClick={() => onSelect(c)}
              className={`w-full text-left px-3 py-2 rounded ${
                selected === c
                  ? "bg-slate-700"
                  : "hover:bg-slate-700"
              }`}
            >
              {c}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChannelSidebar;
