import { useEffect, useState } from "react";
import ChartSection from "../components/ChartSection";
import SummaryCards from "../components/SummaryCards";
import { useMood } from "../context/MoodContext";

const Dashboard = () => {
  const { fetchWeeklySummary, fetchDashboard } = useMood();
  const [summary, setSummary] = useState(null);
  const [dashboardData, setDashboardData] = useState({ trend: [], distribution: {}, streak: 0, totalEntries: 0 });

  useEffect(() => {
    const load = async () => {
      const [weekly, full] = await Promise.all([fetchWeeklySummary(), fetchDashboard()]);
      setSummary(weekly);
      setDashboardData(full);
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
          <p className="text-sm text-slate-500">Streak</p>
          <p className="text-2xl font-bold">{dashboardData.streak} days</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
          <p className="text-sm text-slate-500">Most Frequent Mood</p>
          <p className="text-2xl font-bold">{summary?.mostFrequentMood || "none"}</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
          <p className="text-sm text-slate-500">Total Entries (30d)</p>
          <p className="text-2xl font-bold">{dashboardData.totalEntries}</p>
        </div>
      </div>

      <SummaryCards summary={summary || {}} />
      <ChartSection summary={summary || {}} trend={dashboardData.trend || []} />
    </div>
  );
};

export default Dashboard;
