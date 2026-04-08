import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";
import { MOODS } from "../utils/mood";

const moodColor = Object.fromEntries(MOODS.map((m) => [m.key, m.color]));

const ChartSection = ({ summary, trend }) => {
  const barData = MOODS.map((mood) => ({ name: mood.label, value: summary?.[mood.key] || 0, color: mood.color }));
  const pieData = barData.filter((item) => item.value > 0);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
        <h4 className="mb-3 font-semibold">Weekly Mood Count</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {barData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
        <h4 className="mb-3 font-semibold">Mood Split</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label>
                {pieData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
        <h4 className="mb-3 font-semibold">30 Day Trend</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" hide />
              <YAxis domain={[0, 5]} allowDecimals={false} />
              <Tooltip
                formatter={(value, _, props) => [
                  value,
                  `Mood score (${props.payload?.mood ? props.payload.mood : "unknown"})`
                ]}
              />
              <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
