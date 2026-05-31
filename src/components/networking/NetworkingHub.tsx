import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { networkingTopics, portsList } from "@/lib/data/cybersecurity-data";
import { Network, ChevronDown, ChevronUp, Zap, List } from "lucide-react";

function PortRiskBadge({ risk }: { risk: string }) {
  const classes: Record<string, string> = {
    Critical: "sev-critical",
    High: "sev-high",
    Medium: "sev-medium",
    Low: "sev-low",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${classes[risk] || "sev-medium"}`}>{risk}</span>
  );
}

function OSIModelVisual() {
  const layers = [
    { num: 7, name: "Application", color: "#ef4444", desc: "HTTP, FTP, SMTP, DNS", attack: "SQLi, XSS" },
    { num: 6, name: "Presentation", color: "#f97316", desc: "SSL/TLS, JPEG, MP4", attack: "SSL Stripping" },
    { num: 5, name: "Session", color: "#eab308", desc: "NetBIOS, RPC, PPTP", attack: "Session Hijacking" },
    { num: 4, name: "Transport", color: "#22c55e", desc: "TCP, UDP, port numbers", attack: "SYN Flood" },
    { num: 3, name: "Network", color: "#06b6d4", desc: "IP, ICMP, ARP, routers", attack: "IP Spoofing" },
    { num: 2, name: "Data Link", color: "#8b5cf6", desc: "Ethernet, MAC, switches", attack: "ARP Poisoning" },
    { num: 1, name: "Physical", color: "#ec4899", desc: "Cables, hubs, signals", attack: "Wiretapping" },
  ];

  return (
    <div className="space-y-1.5">
      {layers.map((layer) => (
        <div
          key={layer.num}
          className="flex items-center gap-3 p-3 rounded-xl hover:brightness-95 transition-all cursor-default"
          style={{ background: `${layer.color}10`, border: `1px solid ${layer.color}30` }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ background: `${layer.color}20`, color: layer.color }}
          >
            L{layer.num}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm" style={{ color: '#1c1c1e' }}>{layer.name}</span>
              <span className="text-xs hidden sm:block" style={{ color: '#6b7280' }}>{layer.desc}</span>
            </div>
          </div>
          <div className="text-xs flex-shrink-0 hidden md:block" style={{ color: '#9ca3af' }}>
            ⚡ {layer.attack}
          </div>
        </div>
      ))}
      <div className="text-center mt-3">
        <p className="text-xs font-mono" style={{ color: '#1ba94c' }}>
          Mnemonic: "All People Seem To Need Data Processing"
        </p>
      </div>
    </div>
  );
}

function TCPHandshakeVisual() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="glass rounded-xl p-4" style={{ border: '1px solid #e5e7eb' }}>
          <div className="text-3xl mb-2">💻</div>
          <div className="text-sm font-semibold" style={{ color: '#1c1c1e' }}>Client</div>
        </div>
        <div className="flex flex-col justify-center gap-3 py-2">
          {[
            { label: "SYN →", color: "#22c55e", desc: "Seq=0" },
            { label: "← SYN-ACK", color: "#06b6d4", desc: "Seq=0, Ack=1" },
            { label: "ACK →", color: "#8b5cf6", desc: "Ack=1" },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="text-xs font-mono font-bold" style={{ color: step.color }}>{step.label}</div>
              <div className="text-xs" style={{ color: '#9ca3af' }}>{step.desc}</div>
              <div className="h-px mt-1" style={{ background: `${step.color}40` }} />
            </div>
          ))}
        </div>
        <div className="glass rounded-xl p-4" style={{ border: '1px solid #e5e7eb' }}>
          <div className="text-3xl mb-2">🖥️</div>
          <div className="text-sm font-semibold" style={{ color: '#1c1c1e' }}>Server</div>
        </div>
      </div>
      <div className="glass rounded-xl p-4" style={{ border: '1px solid #e5e7eb' }}>
        <h4 className="text-sm font-semibold mb-2" style={{ color: '#1c1c1e' }}>⚡ SYN Flood Attack</h4>
        <p className="text-xs" style={{ color: '#6b7280' }}>Attacker sends thousands of SYN packets without completing the handshake, filling the server's connection table and causing DoS.</p>
        <div className="mt-2 flex gap-2 flex-wrap">
          <span className="tag">Defense: SYN cookies</span>
          <span className="tag">Rate limiting</span>
          <span className="tag">Stateful firewall</span>
        </div>
      </div>
    </div>
  );
}

function DNSFlowVisual() {
  const steps = [
    { num: 1, desc: "Browser checks local cache", actor: "Browser" },
    { num: 2, desc: "Query → Recursive Resolver (ISP)", actor: "OS" },
    { num: 3, desc: "Resolver → Root Name Server (13 sets)", actor: "Resolver" },
    { num: 4, desc: "Root → TLD Server (.com/.org)", actor: "Root NS" },
    { num: 5, desc: "TLD → Authoritative Name Server", actor: "TLD NS" },
    { num: 6, desc: "Auth NS returns IP address", actor: "Auth NS" },
    { num: 7, desc: "IP returned to browser → connect!", actor: "Browser" },
  ];

  return (
    <div className="space-y-2">
      {steps.map((step) => (
        <div key={step.num} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: '#f7f8fa', border: '1px solid #e5e7eb' }}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1ba94c' }}>
            {step.num}
          </div>
          <span className="text-xs font-medium w-20 flex-shrink-0" style={{ color: '#1ba94c' }}>{step.actor}</span>
          <span className="text-xs" style={{ color: '#374151' }}>{step.desc}</span>
        </div>
      ))}
      <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200">
        <p className="text-xs text-red-600 font-semibold mb-1">⚠️ DNS Poisoning Attack</p>
        <p className="text-xs" style={{ color: '#6b7280' }}>Attacker injects false DNS records into a resolver's cache, redirecting users to malicious sites. Defense: DNSSEC validates records with cryptographic signatures.</p>
      </div>
    </div>
  );
}

const topicComponents: Record<string, React.ReactNode> = {
  "osi-model": <OSIModelVisual />,
  "tcp-ip": <TCPHandshakeVisual />,
  "dns": <DNSFlowVisual />,
};

export default function NetworkingHub() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const [activeTab, setActiveTab] = useState<"topics" | "ports">(idParam === "ports" ? "ports" : "topics");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(idParam && idParam !== "ports" ? idParam : "osi-model");
  const [portFilter, setPortFilter] = useState("all");
  const topicRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!idParam) return;
    if (idParam === "ports") {
      setActiveTab("ports");
      return;
    }
    setActiveTab("topics");
    setExpandedTopic(idParam);
    setTimeout(() => {
      topicRefs.current[idParam]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }, [idParam]);

  const filteredPorts = portsList.filter(p =>
    portFilter === "all" ? true : p.risk === portFilter
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5" style={{ color: '#1ba94c' }} />
            <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>Networking Fundamentals</h1>
          </div>
          <p className="text-sm" style={{ color: '#6b7280' }}>Visual guides, flowcharts, and attack mappings for every networking concept</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("topics")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={activeTab === "topics"
              ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
              : { color: '#6b7280', border: '1px solid transparent' }
            }
          >
            Topics
          </button>
          <button
            onClick={() => setActiveTab("ports")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={activeTab === "ports"
              ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
              : { color: '#6b7280', border: '1px solid transparent' }
            }
          >
            Ports Reference
          </button>
        </div>
      </div>

      {activeTab === "topics" ? (
        <div className="space-y-3">
          {networkingTopics.map((topic) => {
            const isOpen = expandedTopic === topic.id;
            return (
              <div
                key={topic.id}
                ref={(el) => { topicRefs.current[topic.id] = el; }}
                className="glass rounded-xl overflow-hidden"
                style={{ border: '1px solid #e5e7eb' }}
              >
                <button
                  onClick={() => setExpandedTopic(isOpen ? null : topic.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold" style={{ color: '#1c1c1e' }}>{topic.name}</h3>
                      <span className="tag">{topic.category}</span>
                      <span className="tag">{topic.difficulty}</span>
                    </div>
                    <p className="text-sm" style={{ color: '#6b7280' }}>{topic.shortDef}</p>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: '#1ba94c' }} /> : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: '#9ca3af' }} />}
                </button>

                {isOpen && (
                  <div className="p-5 space-y-5" style={{ borderTop: '1px solid #f3f4f6' }}>
                    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                      <p className="text-xs font-semibold text-purple-600 mb-1">💡 Real-World Analogy</p>
                      <p className="text-sm" style={{ color: '#374151' }}>{topic.analogy}</p>
                    </div>

                    {topicComponents[topic.id] && (
                      <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#1c1c1e' }}>
                          <Zap className="w-4 h-4" style={{ color: '#1ba94c' }} /> Visual Breakdown
                        </h4>
                        {topicComponents[topic.id]}
                      </div>
                    )}

                    {topic.layers && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                              <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Layer</th>
                              <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Name</th>
                              <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Role</th>
                              <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Example</th>
                              <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Attack</th>
                            </tr>
                          </thead>
                          <tbody>
                            {topic.layers.map((layer) => (
                              <tr key={layer.num} className="hover:bg-gray-50" style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td className="py-2 px-3 font-mono font-bold" style={{ color: '#1ba94c' }}>{layer.num}</td>
                                <td className="py-2 px-3 font-medium" style={{ color: '#1c1c1e' }}>{layer.name}</td>
                                <td className="py-2 px-3" style={{ color: '#6b7280' }}>{layer.role}</td>
                                <td className="py-2 px-3" style={{ color: '#6b7280' }}>{layer.example}</td>
                                <td className="py-2 px-3 text-xs text-red-500">{layer.attack}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {topic.howItWorks && !topicComponents[topic.id] && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2" style={{ color: '#1c1c1e' }}>How It Works</h4>
                        <ol className="space-y-1.5">
                          {topic.howItWorks.map((step, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#374151' }}>
                              <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1ba94c' }}>{i + 1}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {topic.cidrTable && (
                      <div className="overflow-x-auto">
                        <h4 className="text-sm font-semibold mb-2" style={{ color: '#1c1c1e' }}>CIDR Reference</h4>
                        <table className="w-full text-sm">
                          <thead>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                              <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>CIDR</th>
                              <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Usable Hosts</th>
                              <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Subnet Mask</th>
                              <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Use Case</th>
                            </tr>
                          </thead>
                          <tbody>
                            {topic.cidrTable.map((row) => (
                              <tr key={row.cidr} className="hover:bg-gray-50" style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td className="py-2 px-3 font-mono font-bold" style={{ color: '#1ba94c' }}>{row.cidr}</td>
                                <td className="py-2 px-3" style={{ color: '#1c1c1e' }}>{row.hosts.toLocaleString()}</td>
                                <td className="py-2 px-3 font-mono text-xs" style={{ color: '#6b7280' }}>{row.mask}</td>
                                <td className="py-2 px-3" style={{ color: '#6b7280' }}>{row.use}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {topic.attacks && topic.attacks.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-red-500 mb-2 flex items-center gap-1">⚡ Common Attacks</h4>
                          <ul className="space-y-1">
                            {topic.attacks.map((a, i) => (
                              <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#6b7280' }}>
                                <span className="text-red-500 mt-0.5">•</span>{a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {topic.defense && topic.defense.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1">🛡️ Defenses</h4>
                          <ul className="space-y-1">
                            {topic.defense.map((d, i) => (
                              <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#6b7280' }}>
                                <span className="text-green-500 mt-0.5">•</span>{d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {topic.interviewQ && topic.interviewQ.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-yellow-600 mb-2 flex items-center gap-1">🎓 Interview Questions</h4>
                          <ul className="space-y-1">
                            {topic.interviewQ.map((q, i) => (
                              <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#6b7280' }}>
                                <span className="text-yellow-500 mt-0.5">?</span>{q}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {topic.mnemonic && (
                      <div className="p-3 rounded-xl" style={{ background: '#f0faf4', border: '1px solid #b7e4c7' }}>
                        <p className="text-xs font-semibold mb-1" style={{ color: '#1ba94c' }}>🧠 Memory Trick</p>
                        <p className="text-sm font-mono" style={{ color: '#374151' }}>{topic.mnemonic}</p>
                      </div>
                    )}

                    {topic.ports && topic.ports.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold mb-2" style={{ color: '#1c1c1e' }}>Key Ports</h4>
                        <div className="flex gap-2 flex-wrap">
                          {topic.ports.map((p) => (
                            <span key={p.port} className="tag font-mono">:{p.port} {p.protocol} — {p.use}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
          <div className="flex items-center gap-3 px-5 py-4 flex-wrap" style={{ borderBottom: '1px solid #f3f4f6' }}>
            <List className="w-4 h-4" style={{ color: '#1ba94c' }} />
            <h2 className="font-semibold" style={{ color: '#1c1c1e' }}>Common Ports & Services</h2>
            <div className="flex gap-2 ml-auto flex-wrap">
              {["all", "Critical", "High", "Medium", "Low"].map(f => (
                <button
                  key={f}
                  onClick={() => setPortFilter(f)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all capitalize"
                  style={portFilter === f
                    ? { background: '#1ba94c', color: '#fff' }
                    : { color: '#9ca3af' }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                  <th className="text-left py-3 px-5 text-xs font-medium" style={{ color: '#9ca3af' }}>Port</th>
                  <th className="text-left py-3 px-5 text-xs font-medium" style={{ color: '#9ca3af' }}>Service</th>
                  <th className="text-left py-3 px-5 text-xs font-medium" style={{ color: '#9ca3af' }}>Protocol</th>
                  <th className="text-left py-3 px-5 text-xs font-medium" style={{ color: '#9ca3af' }}>Risk</th>
                  <th className="text-left py-3 px-5 text-xs font-medium" style={{ color: '#9ca3af' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredPorts.map((port) => (
                  <tr key={port.port} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td className="py-3 px-5 font-mono font-bold" style={{ color: '#1ba94c' }}>{port.port}</td>
                    <td className="py-3 px-5 font-medium" style={{ color: '#1c1c1e' }}>{port.service}</td>
                    <td className="py-3 px-5 font-mono text-xs" style={{ color: '#6b7280' }}>{port.protocol}</td>
                    <td className="py-3 px-5">
                      <PortRiskBadge risk={port.risk} />
                    </td>
                    <td className="py-3 px-5 text-sm" style={{ color: '#6b7280' }}>{port.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
