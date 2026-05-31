import { useState } from "react";
import { interviewCategories, behavioralQuestions, quickFireFacts } from "@/lib/data/interview-data";
import { Award, ChevronDown, ChevronUp, Zap, Brain, MessageSquare, CheckCircle, Clock } from "lucide-react";

const difficultyColor: Record<string, string> = {
  Easy: "sev-low",
  Medium: "sev-medium",
  Hard: "sev-high",
};

function QuestionCard({ q, a, tags, difficulty }: { q: string; a: string; tags: string[]; difficulty: string }) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="glass rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded border ${difficultyColor[difficulty]}`}>{difficulty}</span>
            {tags.filter(t => ["common", "must-know"].includes(t)).map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#fefce8', border: '1px solid #fde68a', color: '#ca8a04' }}>
                {t === "common" ? "⭐ Common" : "🔥 Must Know"}
              </span>
            ))}
          </div>
          <p className="text-sm font-medium leading-snug" style={{ color: '#1c1c1e' }}>{q}</p>
        </div>
        {open ? <ChevronUp className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#1ba94c' }} /> : <ChevronDown className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#9ca3af' }} />}
      </button>

      {open && (
        <div className="p-4 space-y-3" style={{ borderTop: '1px solid #f3f4f6' }}>
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="w-full py-2.5 rounded-xl border border-dashed text-sm transition-all"
              style={{ borderColor: '#b7e4c7', color: '#1ba94c' }}
            >
              Click to reveal answer →
            </button>
          ) : (
            <div className="space-y-2">
              <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans" style={{ color: '#374151' }}>{a}</pre>
              <div className="flex flex-wrap gap-1.5 pt-2" style={{ borderTop: '1px solid #f3f4f6' }}>
                {tags.map(tag => <span key={tag} className="tag text-xs">{tag}</span>)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QuickFireMode() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(false);
  const [score, setScore] = useState({ knew: 0, total: 0 });

  const current = quickFireFacts[idx];
  const done = score.total === quickFireFacts.length;

  const next = (knew: boolean) => {
    setScore(s => ({ knew: s.knew + (knew ? 1 : 0), total: s.total + 1 }));
    setShown(false);
    setIdx(i => (i + 1) % quickFireFacts.length);
  };

  if (done) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-4xl">🏆</div>
        <h3 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>{score.knew}/{score.total} Quick Facts Known</h3>
        <p className="text-sm" style={{ color: '#6b7280' }}>{score.knew >= 12 ? "Excellent! You're interview-ready." : "Keep reviewing — try again!"}</p>
        <button onClick={() => { setIdx(0); setScore({ knew: 0, total: 0 }); setShown(false); }}
          className="px-4 py-2 rounded-xl text-sm transition-all"
          style={{ background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1ba94c' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="flex justify-between text-xs mb-2" style={{ color: '#9ca3af' }}>
        <span>{score.total + 1} / {quickFireFacts.length}</span>
        <span className="text-green-500">{score.knew} known ✓</span>
      </div>
      <div className="w-full h-1 rounded-full" style={{ background: '#e5e7eb' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(score.total / quickFireFacts.length) * 100}%`, background: '#1ba94c' }} />
      </div>

      <div
        onClick={() => setShown(true)}
        className="glass rounded-2xl p-6 text-center cursor-pointer transition-all min-h-[140px] flex flex-col items-center justify-center gap-3"
        style={{ border: '1px solid #e5e7eb' }}
      >
        <div className="flex items-center gap-1.5 text-xs text-yellow-500 mb-1">
          <Zap className="w-3.5 h-3.5" /> Quick Fire
        </div>
        <p className="text-base font-semibold" style={{ color: '#1c1c1e' }}>{current.q}</p>
        {!shown && <p className="text-xs mt-2" style={{ color: '#9ca3af' }}>Tap to reveal</p>}
        {shown && (
          <div className="mt-2 p-3 rounded-xl w-full text-left" style={{ background: '#f0fdf4', border: '1px solid #86efac' }}>
            <p className="text-sm text-green-700">{current.a}</p>
          </div>
        )}
      </div>

      {shown && (
        <div className="flex gap-3">
          <button onClick={() => next(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all" style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626' }}>
            ✗ Didn't know
          </button>
          <button onClick={() => next(true)} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all" style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a' }}>
            ✓ Knew it!
          </button>
        </div>
      )}
    </div>
  );
}

export default function InterviewPrepHub() {
  const [activeTab, setActiveTab] = useState<"technical" | "behavioral" | "quickfire">("technical");
  const [activeCategory, setActiveCategory] = useState(interviewCategories[0].id);
  const [diffFilter, setDiffFilter] = useState("All");

  const currentCat = interviewCategories.find(c => c.id === activeCategory)!;
  const filteredQs = currentCat.questions.filter(q =>
    diffFilter === "All" || q.difficulty === diffFilter
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">

      <div className="glass rounded-2xl p-6" style={{ border: '1px solid #b7e4c7', background: '#f0faf4' }}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl" style={{ background: '#1ba94c20', border: '1px solid #1ba94c50' }}>
            <Award className="w-7 h-7" style={{ color: '#1ba94c' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: '#1c1c1e' }}>Cybersecurity Interview Prep</h1>
            <p className="text-sm max-w-2xl" style={{ color: '#6b7280' }}>
              Complete question bank covering networking, web security, cryptography, threats, frameworks, SOC, Active Directory, and cloud — with full model answers, difficulty ratings, and common interview tags.
            </p>
            <div className="flex gap-3 mt-3 flex-wrap">
              {[
                { label: `${interviewCategories.reduce((a, c) => a + c.questions.length, 0)} Questions`, icon: "📋" },
                { label: `${behavioralQuestions.length} Behavioral`, icon: "🎭" },
                { label: `${quickFireFacts.length} Quick Facts`, icon: "⚡" },
                { label: "Full Model Answers", icon: "✅" },
              ].map(item => (
                <span key={item.label} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ background: '#ffffff', border: '1px solid #e5e7eb', color: '#6b7280' }}>
                  {item.icon} {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { id: "technical" as const, label: "Technical Questions", icon: <Brain className="w-4 h-4" /> },
          { id: "behavioral" as const, label: "Behavioral Questions", icon: <MessageSquare className="w-4 h-4" /> },
          { id: "quickfire" as const, label: "Quick Fire Facts", icon: <Zap className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={activeTab === tab.id
              ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
              : { background: '#ffffff', border: '1px solid #e5e7eb', color: '#6b7280' }
            }
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "technical" && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {interviewCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border"
                style={activeCategory === cat.id
                  ? { background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1ba94c' }
                  : { background: '#ffffff', border: '1px solid #e5e7eb', color: '#6b7280' }
                }
              >
                <span>{cat.icon}</span> {cat.label}
                <span className="ml-1 text-xs opacity-60">({cat.questions.length})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-2">
              {["All", "Easy", "Medium", "Hard"].map(d => (
                <button
                  key={d}
                  onClick={() => setDiffFilter(d)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                  style={diffFilter === d
                    ? { background: '#f7f8fa', color: '#1c1c1e', border: '1px solid #e5e7eb' }
                    : { color: '#9ca3af' }
                  }
                >
                  {d}
                </button>
              ))}
            </div>
            <span className="text-xs" style={{ color: '#d1d5db' }}>{filteredQs.length} questions</span>
          </div>

          <div className="space-y-3">
            {filteredQs.map((q, i) => (
              <QuestionCard key={i} q={q.q} a={q.a} tags={q.tags} difficulty={q.difficulty} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "behavioral" && (
        <div className="space-y-4">
          <div className="glass rounded-xl p-4" style={{ border: '1px solid #e5e7eb' }}>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              <span className="font-semibold" style={{ color: '#1ba94c' }}>Interview tip:</span> Use the <span className="font-semibold" style={{ color: '#1c1c1e' }}>STAR framework</span> for all behavioral answers — <span style={{ color: '#1ba94c' }}>S</span>ituation, <span style={{ color: '#1ba94c' }}>T</span>ask, <span style={{ color: '#1ba94c' }}>A</span>ction, <span style={{ color: '#1ba94c' }}>R</span>esult. Keep answers under 2 minutes. Quantify impact whenever possible.
            </p>
          </div>

          {behavioralQuestions.map((bq, i) => (
            <div key={i} className="glass rounded-xl p-5" style={{ border: '1px solid #e5e7eb' }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', color: '#7c3aed' }}>
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold leading-snug" style={{ color: '#1c1c1e' }}>{bq.q}</p>
                  <span className="text-xs mt-1 block text-purple-600">{bq.framework}</span>
                </div>
              </div>
              <div className="ml-11">
                <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#9ca3af' }}>What interviewers want to hear:</p>
                <ul className="space-y-1.5">
                  {bq.tips.map((tip, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#374151' }}>
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "quickfire" && (
        <div className="space-y-6">
          <div className="glass rounded-xl p-4" style={{ border: '1px solid #fde68a' }}>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              <span className="font-semibold text-yellow-600">Quick Fire:</span> These are the fast-answer facts interviewers ask in the first 5 minutes to gauge your baseline knowledge. Reveal each answer and track what you know.
            </p>
          </div>
          <QuickFireMode />

          <div className="glass rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
            <div className="px-5 py-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <h3 className="font-semibold text-sm" style={{ color: '#1c1c1e' }}>All Quick Facts — Reference</h3>
            </div>
            <div>
              {quickFireFacts.map((fact, i) => (
                <div key={i} className="flex gap-4 px-5 py-3 hover:bg-gray-50 transition-colors" style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <p className="text-sm font-medium flex-1" style={{ color: '#374151' }}>{fact.q}</p>
                  <p className="text-sm flex-1" style={{ color: '#1ba94c' }}>{fact.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="glass rounded-xl p-5" style={{ border: '1px solid #bbf7d0' }}>
        <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#1c1c1e' }}>
          <Clock className="w-4 h-4 text-green-500" /> Interview Day Checklist
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Before the Interview",
              items: [
                "Research the company's tech stack and recent security news",
                "Review the job description — map it to ATT&CK or OWASP",
                "Practice explaining OSI, CIA triad, and OWASP top 10 out loud",
                "Prepare 2-3 STAR stories from past experience",
                "Set up a lab environment (TryHackMe, HTB) to show hands-on",
              ]
            },
            {
              title: "During the Interview",
              items: [
                "Think out loud — show your reasoning, not just the answer",
                "If unsure, say what you DO know and how you'd find out",
                "Relate answers to real incidents (SolarWinds, Log4Shell, etc.)",
                "Ask clarifying questions — shows analytical thinking",
                "Have questions ready: detection coverage, team tooling, incident process",
              ]
            },
          ].map(section => (
            <div key={section.title}>
              <p className="text-xs font-semibold text-green-600 mb-2 uppercase tracking-wider">{section.title}</p>
              <ul className="space-y-1.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#6b7280' }}>
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
