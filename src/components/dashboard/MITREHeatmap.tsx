import { Link } from "react-router-dom";
import { frameworksData } from "@/lib/data/cybersecurity-data";
import { Target } from "lucide-react";

const tacticActivity = [
  { id: "TA0001", level: 4 },
  { id: "TA0002", level: 3 },
  { id: "TA0003", level: 5 },
  { id: "TA0004", level: 4 },
  { id: "TA0005", level: 4 },
  { id: "TA0006", level: 3 },
  { id: "TA0007", level: 3 },
  { id: "TA0008", level: 4 },
  { id: "TA0009", level: 3 },
  { id: "TA0010", level: 2 },
  { id: "TA0011", level: 3 },
  { id: "TA0040", level: 4 },
];

function getActivityColor(level: number) {
  const colors = ["bg-gray-100", "bg-green-100", "bg-green-200", "bg-green-300", "bg-green-400", "bg-red-400"];
  return colors[level] || colors[0];
}

export default function MITREHeatmap() {
  const mitre = frameworksData.find(f => f.id === "mitre-attack");
  if (!mitre) return null;

  return (
    <div className="glass rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" style={{ color: '#1ba94c' }} />
          <h2 className="font-semibold" style={{ color: '#1c1c1e' }}>MITRE ATT&CK</h2>
          <span className="text-xs" style={{ color: '#9ca3af' }}>Tactic Activity</span>
        </div>
        <Link to="/frameworks?id=mitre-attack" className="text-xs hover:underline" style={{ color: '#1ba94c' }}>
          Full matrix →
        </Link>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {mitre.tactics?.map((tactic) => {
            const activity = tacticActivity.find(a => a.id === tactic.id);
            const level = activity?.level || 0;
            return (
              <div
                key={tactic.id}
                className={`${getActivityColor(level)} rounded-lg p-2.5 cursor-default hover:brightness-95 transition-all group`}
                title={`${tactic.name}: Activity level ${level}/5`}
              >
                <div className="text-xs font-mono" style={{ color: '#6b7280' }}>{tactic.id}</div>
                <div className="text-xs font-medium mt-0.5 leading-tight truncate" style={{ color: '#1c1c1e' }}>{tactic.name}</div>
                <div className="flex gap-0.5 mt-1.5">
                  {[1,2,3,4,5].map(i => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i <= level ? "bg-green-500" : "bg-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs" style={{ color: '#9ca3af' }}>
          <span>Low activity</span>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(l => (
              <div key={l} className={`w-4 h-2 rounded-sm ${getActivityColor(l)}`} />
            ))}
          </div>
          <span>High activity</span>
        </div>
      </div>
    </div>
  );
}
