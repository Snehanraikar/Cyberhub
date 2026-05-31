import { useState } from "react";
import { quizData } from "@/lib/data/cybersecurity-data";
import { Brain, ChevronLeft, ChevronRight, RotateCcw, Check, X, Zap } from "lucide-react";

const flashcards = [
  { front: "What is SQL Injection?", back: "A code injection technique where malicious SQL statements are inserted into entry fields, manipulating the database to reveal or modify data.", category: "Web Security" },
  { front: "What does XSS stand for?", back: "Cross-Site Scripting — an attack where malicious scripts are injected into web pages, executing in victims' browsers.", category: "Web Security" },
  { front: "What is the OSI model?", back: "A 7-layer framework (Physical, Data Link, Network, Transport, Session, Presentation, Application) defining how data travels over networks.", category: "Networking" },
  { front: "What is a zero-day vulnerability?", back: "A security flaw that is unknown to the vendor, giving zero days of advance warning before exploitation. Often sold on dark web markets.", category: "Vulnerabilities" },
  { front: "What is ARP poisoning?", back: "An attack where false ARP messages link attacker's MAC to legitimate IP, intercepting traffic (MITM). Defense: ARP inspection, static ARP entries.", category: "Networking" },
  { front: "What is Kerberoasting?", back: "Extracting service account ticket hashes from Active Directory and cracking them offline to obtain credentials. Defense: strong passwords, Protected Users group.", category: "Active Directory" },
  { front: "What is CVSS?", back: "Common Vulnerability Scoring System — a framework for rating vulnerability severity 0-10 (None, Low, Medium, High, Critical).", category: "Frameworks" },
  { front: "What is a reverse shell?", back: "An attack where the victim connects back to the attacker's machine, bypassing firewall rules. The attacker then has remote command execution.", category: "Post-Exploitation" },
  { front: "What does MITRE ATT&CK T1566 represent?", back: "Phishing — the initial access technique of using deceptive emails or messages to trick victims.", category: "Threat Intelligence" },
  { front: "What is lateral movement?", back: "MITRE ATT&CK tactic (TA0010) where attackers move through a network to reach high-value targets after initial compromise.", category: "Post-Exploitation" },
  { front: "What is OSINT?", back: "Open Source Intelligence — gathering information from publicly available sources (social media, domain records, job postings) for reconnaissance.", category: "Reconnaissance" },
  { front: "What is a WAF?", back: "Web Application Firewall — filters HTTP traffic between the internet and web app, blocking common attacks like SQLi and XSS.", category: "Defenses" },
];

function FlashcardMode() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [unknown, setUnknown] = useState<number[]>([]);

  const current = flashcards[currentIdx];
  const progress = ((known.length + unknown.length) / flashcards.length) * 100;

  const next = (knew: boolean) => {
    if (knew) setKnown(prev => [...prev, currentIdx]);
    else setUnknown(prev => [...prev, currentIdx]);
    setFlipped(false);
    setCurrentIdx(prev => (prev + 1) % flashcards.length);
  };

  const reset = () => {
    setCurrentIdx(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
  };

  if (known.length + unknown.length === flashcards.length) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-5xl">🎉</div>
        <h3 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>Session Complete!</h3>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{known.length}</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Known</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">{unknown.length}</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Need Review</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: '#1ba94c' }}>{Math.round((known.length / flashcards.length) * 100)}%</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Score</div>
          </div>
        </div>
        <button onClick={reset} className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl text-sm transition-all" style={{ background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1ba94c' }}>
          <RotateCcw className="w-4 h-4" /> Start Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between text-xs mb-2" style={{ color: '#9ca3af' }}>
          <span>{currentIdx + 1} / {flashcards.length}</span>
          <div className="flex items-center gap-3">
            <span className="text-green-500">✓ {known.length} known</span>
            <span className="text-red-500">✗ {unknown.length} review</span>
          </div>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: '#1ba94c' }} />
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className="w-full max-w-xl h-64 cursor-pointer"
          style={{ perspective: "1000px" }}
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className="relative w-full h-full transition-all duration-500"
            style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            <div
              className="absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center p-8 text-center"
              style={{ backfaceVisibility: "hidden", border: '1px solid #b7e4c7' }}
            >
              <div className="tag mb-4">{current.category}</div>
              <h3 className="text-lg font-semibold" style={{ color: '#1c1c1e' }}>{current.front}</h3>
              <p className="text-xs mt-4" style={{ color: '#9ca3af' }}>Click to reveal answer</p>
            </div>
            <div
              className="absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center p-8 text-center"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", border: '1px solid #d8b4fe', background: '#faf5ff' }}
            >
              <div className="tag mb-4">{current.category}</div>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>{current.back}</p>
            </div>
          </div>
        </div>
      </div>

      {flipped && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => next(false)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
            style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626' }}
          >
            <X className="w-4 h-4" /> Need Review
          </button>
          <button
            onClick={() => next(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
            style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a' }}
          >
            <Check className="w-4 h-4" /> Got It!
          </button>
        </div>
      )}

      {!flipped && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentIdx(prev => (prev - 1 + flashcards.length) % flashcards.length)}
            className="p-2.5 rounded-xl transition-all"
            style={{ background: '#f7f8fa', border: '1px solid #e5e7eb', color: '#6b7280' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm" style={{ color: '#9ca3af' }}>Click card to flip</span>
          <button
            onClick={() => setCurrentIdx(prev => (prev + 1) % flashcards.length)}
            className="p-2.5 rounded-xl transition-all"
            style={{ background: '#f7f8fa', border: '1px solid #e5e7eb', color: '#6b7280' }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function QuizMode() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const current = quizData[currentIdx];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === current.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, correct]);
  };

  const next = () => {
    if (currentIdx + 1 >= quizData.length) {
      setFinished(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-5xl">{score >= 6 ? "🏆" : score >= 4 ? "👍" : "📚"}</div>
        <h3 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>{score}/{quizData.length} Correct</h3>
        <p style={{ color: '#6b7280' }}>
          {score >= 7 ? "Excellent! You really know your cybersecurity!" : score >= 5 ? "Good job! Keep studying." : "Keep learning — you've got this!"}
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {answers.map((correct, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={correct
                ? { background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac' }
                : { background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' }
              }
            >
              {i + 1}
            </div>
          ))}
        </div>
        <button onClick={reset} className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl text-sm transition-all" style={{ background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1ba94c' }}>
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <div className="flex justify-between text-xs mb-2" style={{ color: '#9ca3af' }}>
          <span>Q{currentIdx + 1} of {quizData.length}</span>
          <span style={{ color: '#1ba94c' }}>{current.category}</span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${((currentIdx) / quizData.length) * 100}%`, background: '#1ba94c' }} />
        </div>
      </div>

      <div className="glass rounded-xl p-5" style={{ border: '1px solid #e5e7eb' }}>
        <h3 className="font-semibold text-lg leading-relaxed" style={{ color: '#1c1c1e' }}>{current.question}</h3>
      </div>

      <div className="space-y-2.5">
        {current.options.map((option, i) => {
          let style: React.CSSProperties = { background: '#ffffff', border: '1px solid #e5e7eb', color: '#374151' };
          if (selected !== null) {
            if (i === current.answer) style = { background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a' };
            else if (i === selected && i !== current.answer) style = { background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626' };
            else style = { background: '#f9fafb', border: '1px solid #f3f4f6', color: '#9ca3af' };
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all"
              style={style}
            >
              <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm">{option}</span>
              {selected !== null && i === current.answer && <Check className="w-4 h-4 text-green-500 ml-auto" />}
              {selected !== null && i === selected && i !== current.answer && <X className="w-4 h-4 text-red-500 ml-auto" />}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className={`p-4 rounded-xl text-sm leading-relaxed`}
          style={selected === current.answer
            ? { background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a' }
            : { background: '#fff7ed', border: '1px solid #fdba74', color: '#ea580c' }
          }
        >
          <span className="font-semibold">
            {selected === current.answer ? "✓ Correct! " : "✗ Incorrect. "}
          </span>
          {current.explanation}
        </div>
      )}

      {selected !== null && (
        <button
          onClick={next}
          className="w-full py-3 rounded-xl font-medium transition-all"
          style={{ background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1ba94c' }}
        >
          {currentIdx + 1 >= quizData.length ? "See Results" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

function MnemonicsPanel() {
  const mnemonics = [
    { topic: "OSI Layers (top→bottom)", mnemonic: "All People Seem To Need Data Processing", breakdown: "Application, Presentation, Session, Transport, Network, Data Link, Physical" },
    { topic: "OSI Layers (bottom→top)", mnemonic: "Please Do Not Throw Sausage Pizza Away", breakdown: "Physical, Data Link, Network, Transport, Session, Presentation, Application" },
    { topic: "TCP/IP Layers", mnemonic: "A Tiger Named Leo", breakdown: "Application, Transport, Network, Link" },
    { topic: "Cyber Kill Chain", mnemonic: "Really Well-Dressed Executives Intimidate Corporate Associates", breakdown: "Reconnaissance, Weaponization, Delivery, Exploitation, Installation, C2, Actions" },
    { topic: "CIA Triad", mnemonic: "CIA = Secret Agent", breakdown: "Confidentiality, Integrity, Availability — the 3 pillars of information security" },
    { topic: "STRIDE Threats", mnemonic: "STRIDE across threats", breakdown: "Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege" },
    { topic: "CVSS Rating Severity", mnemonic: "No one Likes Mighty Heavy Criminals", breakdown: "None (0), Low (0.1-3.9), Medium (4-6.9), High (7-8.9), Critical (9-10)" },
    { topic: "DNS Resolution Order", mnemonic: "Boys Rarely Roam To Actual Computers", breakdown: "Browser cache, Resolver, Root NS, TLD NS, Authoritative NS, Computer gets IP" },
  ];

  return (
    <div className="space-y-3">
      {mnemonics.map((m, i) => (
        <div key={i} className="glass rounded-xl p-4" style={{ border: '1px solid #e5e7eb' }}>
          <div className="text-xs mb-1" style={{ color: '#9ca3af' }}>{m.topic}</div>
          <div className="text-base font-semibold font-mono mb-2" style={{ color: '#1ba94c' }}>"{m.mnemonic}"</div>
          <p className="text-xs" style={{ color: '#6b7280' }}>{m.breakdown}</p>
        </div>
      ))}
    </div>
  );
}

export default function MemoryHub() {
  const [activeMode, setActiveMode] = useState<"flashcards" | "quiz" | "mnemonics">("flashcards");

  const modes = [
    { id: "flashcards" as const, label: "Flashcards", icon: "🃏", desc: "Flip cards for key concepts" },
    { id: "quiz" as const, label: "Quiz Mode", icon: "🧪", desc: "Test your knowledge" },
    { id: "mnemonics" as const, label: "Mnemonics", icon: "🧠", desc: "Memory tricks & shortcuts" },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-5 h-5 text-green-500" />
          <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>Interactive Memory System</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7280' }}>Flashcards, quizzes, and mnemonics designed for spaced repetition learning</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className="p-4 rounded-xl text-left transition-all border"
            style={activeMode === mode.id
              ? { background: '#f0faf4', border: '1px solid #b7e4c7' }
              : { background: '#ffffff', border: '1px solid #e5e7eb' }
            }
          >
            <div className="text-2xl mb-2">{mode.icon}</div>
            <div className="font-semibold text-sm" style={{ color: activeMode === mode.id ? '#1ba94c' : '#1c1c1e' }}>{mode.label}</div>
            <div className="text-xs" style={{ color: '#9ca3af' }}>{mode.desc}</div>
          </button>
        ))}
      </div>

      <div className="glass rounded-xl p-6" style={{ border: '1px solid #e5e7eb' }}>
        {activeMode === "flashcards" && <FlashcardMode />}
        {activeMode === "quiz" && <QuizMode />}
        {activeMode === "mnemonics" && <MnemonicsPanel />}
      </div>

      <div className="glass rounded-xl p-5" style={{ border: '1px solid #e5e7eb' }}>
        <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#1c1c1e' }}>
          <Zap className="w-4 h-4 text-yellow-500" /> 30-Second Quick Recall
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { concept: "SQL Injection", recall: "Unvalidated input → database commands executed" },
            { concept: "XSS", recall: "Script injected into page → runs in victim's browser" },
            { concept: "CSRF", recall: "Victim clicks link → their browser sends unintended request" },
            { concept: "SSRF", recall: "Server makes request to internal resource on attacker's behalf" },
            { concept: "RCE", recall: "Attacker executes arbitrary code on target system" },
            { concept: "Phishing", recall: "Deceptive email → credential theft or malware delivery" },
          ].map(item => (
            <div key={item.concept} className="p-3 rounded-xl" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <div className="text-sm font-semibold mb-1" style={{ color: '#1ba94c' }}>{item.concept}</div>
              <p className="text-xs leading-snug" style={{ color: '#6b7280' }}>{item.recall}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
