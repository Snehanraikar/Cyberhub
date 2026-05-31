import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { cheatsheets } from "@/lib/data/cybersecurity-data";
import { Code, Copy, Check, Search } from "lucide-react";

function CommandRow({ cmd, desc, idx }: { cmd: string; desc: string; idx: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rowColors = [
    "border-l-green-400",
    "border-l-blue-400",
    "border-l-purple-400",
    "border-l-green-500",
    "border-l-yellow-400",
    "border-l-orange-400",
  ];

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group border-l-2 ${rowColors[idx % rowColors.length]}`}>
      <div className="flex-1 min-w-0">
        <code className="block text-sm font-mono leading-relaxed break-all" style={{ color: '#1ba94c' }}>{cmd}</code>
        <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>{desc}</p>
      </div>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100"
        style={{ color: '#9ca3af' }}
        title="Copy command"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

export default function CheatsheetHub() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const [activeSheet, setActiveSheet] = useState(idParam || cheatsheets[0].id);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (idParam) { setActiveSheet(idParam); setSearch(""); }
  }, [idParam]);

  const current = cheatsheets.find(s => s.id === activeSheet);

  const filteredCommands = current?.commands.filter(c =>
    c.cmd.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Code className="w-5 h-5 text-purple-500" />
          <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>Cheatsheet Center</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7280' }}>Color-coded command references with real-world usage examples</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="glass rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
            <div className="p-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <p className="text-xs font-medium uppercase tracking-wider px-2" style={{ color: '#9ca3af' }}>Categories</p>
            </div>
            <div className="p-2 space-y-1">
              {cheatsheets.map((sheet) => (
                <button
                  key={sheet.id}
                  onClick={() => { setActiveSheet(sheet.id); setSearch(""); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left"
                  style={activeSheet === sheet.id
                    ? { background: '#f0faf4', color: '#1ba94c', border: '1px solid #b7e4c7' }
                    : { color: '#6b7280' }
                  }
                >
                  <span className="text-lg">{sheet.icon}</span>
                  <div>
                    <div className="font-medium" style={{ color: '#1c1c1e' }}>{sheet.name}</div>
                    <div className="text-xs" style={{ color: '#9ca3af' }}>{sheet.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {current && (
            <div className="glass rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
              <div className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                <span className="text-2xl">{current.icon}</span>
                <div>
                  <h2 className="font-bold" style={{ color: '#1c1c1e' }}>{current.name} Cheatsheet</h2>
                  <span className="tag">{current.category}</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: '#9ca3af' }} />
                    <input
                      type="text"
                      placeholder="Filter commands..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-lg text-sm outline-none w-44"
                      style={{ background: '#f7f8fa', border: '1px solid #e5e7eb', color: '#1c1c1e' }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const text = current.commands.map(c => `${c.cmd}  # ${c.desc}`).join("\n");
                      navigator.clipboard.writeText(text);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
                    style={{ background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1ba94c' }}
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy All
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-1">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, i) => (
                    <CommandRow key={i} cmd={cmd.cmd} desc={cmd.desc} idx={i} />
                  ))
                ) : (
                  <div className="text-center py-8 text-sm" style={{ color: '#9ca3af' }}>No commands match your search</div>
                )}
              </div>

              <div className="px-5 py-3" style={{ borderTop: '1px solid #f3f4f6', background: '#f9fafb' }}>
                <p className="text-xs" style={{ color: '#9ca3af' }}>
                  ⚠️ Use only in authorized environments. Always get permission before penetration testing.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
