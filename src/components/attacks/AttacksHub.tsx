import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { attackData } from "@/lib/data/cybersecurity-data";
import { Zap, ChevronDown, ChevronUp, Shield, Target, Code } from "lucide-react";

const categories = ["All", "Web Security", "Malware", "Network", "Post-Exploitation", "Social Engineering"];

function SeverityBadge({ severity }: { severity: string }) {
  const classes: Record<string, string> = {
    Critical: "sev-critical",
    High: "sev-high",
    Medium: "sev-medium",
    Low: "sev-low",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${classes[severity]}`}>{severity}</span>
  );
}

function AttackLifecycle({ steps }: { steps: string[] }) {
  return (
    <div className="relative">
      <div className="flex flex-col gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ borderColor: '#1ba94c80', background: '#f0faf4', color: '#1ba94c' }}>
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="w-0.5 h-6 mt-0.5" style={{ background: '#1ba94c30' }} />}
            </div>
            <div className="pb-4 pt-1">
              <p className="text-sm" style={{ color: '#374151' }}>{step}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttackCard({ attack, initialOpen = false, cardRef }: { attack: typeof attackData[0]; initialOpen?: boolean; cardRef?: (el: HTMLDivElement | null) => void }) {
  const [expanded, setExpanded] = useState(initialOpen);

  useEffect(() => {
    if (initialOpen) setExpanded(true);
  }, [initialOpen]);

  return (
    <div ref={cardRef} className="glass rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-4 p-5 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-semibold" style={{ color: '#1c1c1e' }}>{attack.name}</h3>
            <SeverityBadge severity={attack.severity} />
            <span className="tag">{attack.category}</span>
            <span className="font-mono text-xs" style={{ color: '#9ca3af' }}>{attack.mitre}</span>
          </div>
          <p className="text-sm" style={{ color: '#6b7280' }}>{attack.shortDef}</p>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: '#1ba94c' }} /> : <ChevronDown className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: '#9ca3af' }} />}
      </button>

      {expanded && (
        <div className="p-5 space-y-6" style={{ borderTop: '1px solid #f3f4f6' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{attack.description}</p>

          <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200">
            <p className="text-xs font-semibold text-orange-600 mb-1.5">🌍 Real-World Example</p>
            <p className="text-sm" style={{ color: '#374151' }}>{attack.realWorldExample}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#1c1c1e' }}>
                <Target className="w-4 h-4 text-red-500" /> Attack Lifecycle
              </h4>
              <AttackLifecycle steps={attack.steps} />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#1c1c1e' }}>
                  <Code className="w-4 h-4 text-purple-500" /> Common Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {attack.tools.map((tool) => (
                    <span key={tool} className="px-2.5 py-1 rounded-lg text-purple-600 text-xs font-medium bg-purple-50 border border-purple-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#1c1c1e' }}>
                  <Shield className="w-4 h-4 text-emerald-500" /> Prevention
                </h4>
                <ul className="space-y-1">
                  {attack.prevention.map((p, i) => (
                    <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#6b7280' }}>
                      <span className="text-emerald-500 mt-0.5">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: '#1c1c1e' }}>
                  <Zap className="w-4 h-4 text-amber-500" /> Detection
                </h4>
                <ul className="space-y-1">
                  {attack.detection.map((d, i) => (
                    <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#6b7280' }}>
                      <span className="text-amber-500 mt-0.5">→</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2" style={{ borderTop: '1px solid #f3f4f6' }}>
            {attack.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AttacksHub() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!idParam) return;
    setTimeout(() => {
      cardRefs.current[idParam]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }, [idParam]);

  const filtered = attackData.filter((attack) => {
    const matchesCat = categoryFilter === "All" || attack.category === categoryFilter;
    const matchesSearch = attack.name.toLowerCase().includes(search.toLowerCase()) ||
      attack.shortDef.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5 text-red-500" />
          <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>Attack Visualization Center</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7280' }}>Interactive attack breakdowns with lifecycle diagrams, tools, prevention, and MITRE ATT&CK mappings</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search attacks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: '#f7f8fa', border: '1px solid #e5e7eb', color: '#1c1c1e' }}
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className="px-3 py-2 rounded-xl text-sm font-medium transition-all"
              style={categoryFilter === cat
                ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
                : { background: '#f7f8fa', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs" style={{ color: '#9ca3af' }}>
        Showing {filtered.length} of {attackData.length} attacks
      </div>

      <div className="space-y-3">
        {filtered.map((attack) => (
          <AttackCard
            key={attack.id}
            attack={attack}
            initialOpen={attack.id === idParam}
            cardRef={(el) => { cardRefs.current[attack.id] = el; }}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: '#9ca3af' }}>No attacks match your filters</div>
        )}
      </div>
    </div>
  );
}
