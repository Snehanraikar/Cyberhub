import { useState, Suspense } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Zap, Bug, Network, Code, Target, Brain } from "lucide-react";
import { attackData, networkingTopics, cveData, cheatsheets, frameworksData } from "@/lib/data/cybersecurity-data";

type Result = {
  title: string;
  subtitle: string;
  href: string;
  category: string;
  icon: React.ReactNode;
  tags?: string[];
};

function buildIndex(): Result[] {
  const results: Result[] = [];

  attackData.forEach(a => results.push({
    title: a.name,
    subtitle: a.shortDef,
    href: "/attacks",
    category: "Attack",
    icon: <Zap className="w-4 h-4 text-red-500" />,
    tags: a.tags,
  }));

  networkingTopics.forEach(t => results.push({
    title: t.name,
    subtitle: t.shortDef,
    href: "/networking",
    category: "Networking",
    icon: <Network className="w-4 h-4" style={{ color: '#1ba94c' }} />,
    tags: t.tags,
  }));

  cveData.forEach(c => results.push({
    title: c.id + " — " + c.title,
    subtitle: c.description.slice(0, 90) + "...",
    href: "/cve",
    category: "CVE",
    icon: <Bug className="w-4 h-4 text-orange-500" />,
    tags: c.tags,
  }));

  cheatsheets.forEach(cs => results.push({
    title: cs.name + " Cheatsheet",
    subtitle: cs.category + " — " + cs.commands.length + " commands",
    href: "/cheatsheets",
    category: "Cheatsheet",
    icon: <Code className="w-4 h-4 text-purple-500" />,
  }));

  frameworksData.forEach(f => results.push({
    title: f.name,
    subtitle: f.description.slice(0, 90) + "...",
    href: "/frameworks",
    category: "Framework",
    icon: <Target className="w-4 h-4 text-yellow-500" />,
    tags: f.tags,
  }));

  return results;
}

const allResults = buildIndex();

const categories = ["All", "Attack", "Networking", "CVE", "Cheatsheet", "Framework"];

function SearchContent() {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState("All");

  const filtered = allResults.filter(r => {
    const matchesCat = category === "All" || r.category === category;
    const q = query.toLowerCase();
    const matchesQ = !q ||
      r.title.toLowerCase().includes(q) ||
      r.subtitle.toLowerCase().includes(q) ||
      r.tags?.some(t => t.includes(q));
    return matchesCat && matchesQ;
  });

  const grouped: Record<string, Result[]> = {};
  filtered.forEach(r => {
    if (!grouped[r.category]) grouped[r.category] = [];
    grouped[r.category].push(r);
  });

  return (
    <div className="max-w-[900px] mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Search className="w-5 h-5" style={{ color: '#1ba94c' }} />
          <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>Search</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7280' }}>Search across attacks, CVEs, networking topics, cheatsheets, and frameworks</p>
      </div>

      <div className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
        <Search className="w-5 h-5 flex-shrink-0" style={{ color: '#9ca3af' }} />
        <input
          type="text"
          placeholder="Search CVE, attack type, tool, concept..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: '#1c1c1e' }}
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-xs" style={{ color: '#9ca3af' }}>Clear</button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={category === cat
              ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
              : { background: '#f7f8fa', color: '#6b7280', border: '1px solid #e5e7eb' }
            }
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-60">
              ({cat === "All" ? filtered.length : (grouped[cat]?.length || 0)})
            </span>
          </button>
        ))}
      </div>

      {query || category !== "All" ? (
        filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <div className="text-5xl">🔍</div>
            <p style={{ color: '#6b7280' }}>No results found for "<span style={{ color: '#1c1c1e' }}>{query}</span>"</p>
            <p className="text-sm" style={{ color: '#9ca3af' }}>Try different keywords or browse a section directly</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#9ca3af' }}>
                  {items[0].icon} {cat} <span style={{ color: '#d1d5db' }}>({items.length})</span>
                </h3>
                <div className="space-y-2">
                  {items.map((r, i) => (
                    <Link
                      key={i}
                      to={r.href}
                      className="flex items-start gap-3 p-3.5 glass rounded-xl transition-all group hover:bg-gray-50"
                      style={{ border: '1px solid #e5e7eb' }}
                    >
                      <div className="mt-0.5 flex-shrink-0">{r.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm transition-colors group-hover:text-green-600" style={{ color: '#1c1c1e' }}>{r.title}</div>
                        <div className="text-xs mt-0.5 leading-snug line-clamp-2" style={{ color: '#9ca3af' }}>{r.subtitle}</div>
                        {r.tags && (
                          <div className="flex gap-1 flex-wrap mt-1.5">
                            {r.tags.slice(0, 4).map(t => <span key={t} className="tag text-xs">{t}</span>)}
                          </div>
                        )}
                      </div>
                      <span className="text-xs flex-shrink-0 transition-colors group-hover:text-green-600" style={{ color: '#d1d5db' }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div>
          <p className="text-sm mb-4" style={{ color: '#9ca3af' }}>Browse all {allResults.length} indexed entries or type to search</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { cat: "Attack", count: attackData.length, href: "/attacks", icon: <Zap className="w-5 h-5 text-red-500" />, color: "border-red-200 bg-red-50" },
              { cat: "CVE", count: cveData.length, href: "/cve", icon: <Bug className="w-5 h-5 text-orange-500" />, color: "border-orange-200 bg-orange-50" },
              { cat: "Networking", count: networkingTopics.length, href: "/networking", icon: <Network className="w-5 h-5" style={{ color: '#1ba94c' }} />, color: "border-green-200 bg-green-50" },
              { cat: "Cheatsheet", count: cheatsheets.length, href: "/cheatsheets", icon: <Code className="w-5 h-5 text-purple-500" />, color: "border-purple-200 bg-purple-50" },
              { cat: "Framework", count: frameworksData.length, href: "/frameworks", icon: <Target className="w-5 h-5 text-yellow-500" />, color: "border-yellow-200 bg-yellow-50" },
              { cat: "Memory", count: 12, href: "/memory", icon: <Brain className="w-5 h-5 text-green-500" />, color: "border-green-200 bg-green-50" },
            ].map(item => (
              <Link
                key={item.cat}
                to={item.href}
                className={`flex items-center gap-3 p-4 rounded-xl border hover:shadow-md transition-all ${item.color}`}
              >
                {item.icon}
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#1c1c1e' }}>{item.cat}</div>
                  <div className="text-xs" style={{ color: '#9ca3af' }}>{item.count} entries</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-sm" style={{ color: '#9ca3af' }}>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
