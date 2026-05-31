import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

const monthlyData = [
  { month: "Jan", ransomware: 145, phishing: 320, zeroday: 23, webattack: 198 },
  { month: "Feb", ransomware: 189, phishing: 298, zeroday: 31, webattack: 215 },
  { month: "Mar", ransomware: 234, phishing: 445, zeroday: 18, webattack: 267 },
  { month: "Apr", ransomware: 178, phishing: 389, zeroday: 45, webattack: 312 },
  { month: "May", ransomware: 312, phishing: 521, zeroday: 29, webattack: 289 },
  { month: "Jun", ransomware: 267, phishing: 467, zeroday: 52, webattack: 334 },
  { month: "Jul", ransomware: 398, phishing: 589, zeroday: 38, webattack: 378 },
  { month: "Aug", ransomware: 423, phishing: 612, zeroday: 61, webattack: 401 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; color: string; value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xl">
        <p className="font-medium mb-2 text-xs" style={{ color: '#1ba94c' }}>{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-gray-500 capitalize">{entry.name}:</span>
            <span className="text-gray-900 font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AttackTrendChart() {
  return (
    <div className="glass rounded-xl p-5" style={{ border: '1px solid #e5e7eb' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-semibold" style={{ color: '#1c1c1e' }}>Attack Trends 2026</h2>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Monthly attack category distribution</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { label: "Ransomware", color: "#ef4444" },
            { label: "Phishing", color: "#f97316" },
            { label: "Zero-Day", color: "#8b5cf6" },
            { label: "Web Attack", color: "#1ba94c" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} />
              <span className="text-xs" style={{ color: '#6b7280' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="ransomwareGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="phishingGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="zerodayGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="webGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1ba94c" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#1ba94c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="month" stroke="#d1d5db" tick={{ fill: "#9ca3af", fontSize: 11 }} />
          <YAxis stroke="#d1d5db" tick={{ fill: "#9ca3af", fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="ransomware" stroke="#ef4444" fill="url(#ransomwareGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="phishing" stroke="#f97316" fill="url(#phishingGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="zeroday" stroke="#8b5cf6" fill="url(#zerodayGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="webattack" stroke="#1ba94c" fill="url(#webGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
