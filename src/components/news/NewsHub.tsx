import { useState } from "react";
import { newsData, threatActors } from "@/lib/data/cybersecurity-data";
import { Newspaper, AlertTriangle, Calendar, Users } from "lucide-react";

function SeverityDot({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    Critical: "bg-red-500",
    High: "bg-orange-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };
  return <div className={`w-2 h-2 rounded-full ${colors[severity] || "bg-gray-500"} animate-pulse`} />;
}

function NewsCard({ item }: { item: typeof newsData[0] }) {
  const [expanded, setExpanded] = useState(false);
  const catColors: Record<string, string> = {
    Ransomware: "text-red-600 bg-red-50 border-red-200",
    "Zero-Day": "text-orange-600 bg-orange-50 border-orange-200",
    "Supply Chain": "text-purple-600 bg-purple-50 border-purple-200",
  };

  return (
    <div className="glass rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <SeverityDot severity={item.severity} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${catColors[item.category] || "tag"}`}>
                {item.category}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded border ${item.severity === "Critical" ? "sev-critical" : "sev-high"}`}>
                {item.severity}
              </span>
              <span className="text-xs flex items-center gap-1" style={{ color: '#9ca3af' }}>
                <Calendar className="w-3 h-3" /> {item.date}
              </span>
              <span className="text-xs" style={{ color: '#d1d5db' }}>{item.source}</span>
            </div>
            <h3 className="font-semibold leading-snug" style={{ color: '#1c1c1e' }}>{item.title}</h3>
          </div>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{item.summary}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs hover:underline"
          style={{ color: '#1ba94c' }}
        >
          {expanded ? "Show less" : "Read more →"}
        </button>

        {expanded && (
          <div className="mt-4 space-y-4 pt-4" style={{ borderTop: '1px solid #f3f4f6' }}>
            <div>
              <h4 className="text-xs font-semibold mb-1" style={{ color: '#1c1c1e' }}>Impact Assessment</h4>
              <p className="text-sm" style={{ color: '#6b7280' }}>{item.impact}</p>
            </div>

            {item.affectedSystems.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold mb-2" style={{ color: '#1c1c1e' }}>Affected Systems</h4>
                <div className="flex flex-wrap gap-2">
                  {item.affectedSystems.map((sys) => (
                    <span key={sys} className="tag">{sys}</span>
                  ))}
                </div>
              </div>
            )}

            {item.relatedCVEs.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold mb-2" style={{ color: '#1c1c1e' }}>Related CVEs</h4>
                <div className="flex flex-wrap gap-2">
                  {item.relatedCVEs.map((cve) => (
                    <span key={cve} className="font-mono text-xs px-2 py-1 rounded" style={{ color: '#1ba94c', background: '#f0faf4', border: '1px solid #b7e4c7' }}>
                      {cve}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ThreatActorCard({ actor }: { actor: typeof threatActors[0] }) {
  const nationFlags: Record<string, string> = {
    Russia: "🇷🇺",
    "North Korea": "🇰🇵",
    "Eastern Europe": "🌍",
  };

  return (
    <div className="glass rounded-xl p-4" style={{ border: '1px solid #e5e7eb' }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">{nationFlags[actor.nation] || "🌐"}</span>
            <h3 className="font-semibold" style={{ color: '#1c1c1e' }}>{actor.name}</h3>
          </div>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{actor.nation} • {actor.sponsorship}</p>
        </div>
        <span className="font-mono text-xs px-2 py-1 rounded" style={{ color: '#1ba94c', background: '#f0faf4', border: '1px solid #b7e4c7' }}>{actor.mitre}</span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: '#9ca3af' }}>Primary Targets</p>
          <div className="flex flex-wrap gap-1">
            {actor.targets.map(t => <span key={t} className="tag text-xs">{t}</span>)}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: '#9ca3af' }}>Known Malware</p>
          <div className="flex flex-wrap gap-1">
            {actor.knownMalware.map(m => (
              <span key={m} className="text-xs px-2 py-0.5 rounded bg-red-50 border border-red-200 text-red-600">{m}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: '#9ca3af' }}>Notable Attacks</p>
          <ul className="space-y-0.5">
            {actor.notableAttacks.map((a, i) => (
              <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#6b7280' }}>
                <span className="text-orange-500 mt-0.5">•</span>{a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function NewsHub() {
  const [activeTab, setActiveTab] = useState<"news" | "actors">("news");
  const [catFilter, setCatFilter] = useState("All");

  const categories = ["All", "Ransomware", "Zero-Day", "Supply Chain"];
  const filtered = newsData.filter(n => catFilter === "All" || n.category === catFilter);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Newspaper className="w-5 h-5 text-blue-500" />
            <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>Security Intelligence Hub</h1>
          </div>
          <p className="text-sm" style={{ color: '#6b7280' }}>Latest breaches, threats, and threat actor profiles</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab("news")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={activeTab === "news"
              ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
              : { color: '#6b7280', border: '1px solid transparent' }
            }
          >
            <Newspaper className="w-4 h-4" /> News
          </button>
          <button onClick={() => setActiveTab("actors")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={activeTab === "actors"
              ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
              : { color: '#6b7280', border: '1px solid transparent' }
            }
          >
            <Users className="w-4 h-4" /> Threat Actors
          </button>
        </div>
      </div>

      {activeTab === "news" ? (
        <>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={catFilter === cat
                  ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
                  : { background: '#f7f8fa', color: '#6b7280', border: '1px solid #e5e7eb' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {filtered.map(item => <NewsCard key={item.id} item={item} />)}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <p className="text-sm" style={{ color: '#6b7280' }}>Known state-sponsored and criminal threat actor groups</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {threatActors.map(actor => <ThreatActorCard key={actor.id} actor={actor} />)}
          </div>
        </>
      )}
    </div>
  );
}
