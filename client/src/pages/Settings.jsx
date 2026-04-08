import { useMood } from "../context/MoodContext";
import { exportCSV, exportJSON } from "../utils/exporters";
import ThemeToggle from "../components/ThemeToggle";

const Settings = () => {
  const { entries } = useMood();

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/20 bg-white/70 p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
        <h2 className="font-display text-xl font-semibold">Theme</h2>
        <p className="mb-3 mt-1 text-sm text-slate-500">Choose light, dark, or system mode.</p>
        <ThemeToggle />
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/70 p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
        <h2 className="font-display text-xl font-semibold">Export Data</h2>
        <p className="mb-3 mt-1 text-sm text-slate-500">Download your mood entries as JSON or CSV.</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => exportJSON(entries)} className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900">
            Export JSON
          </button>
          <button type="button" onClick={() => exportCSV(entries)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm dark:border-slate-700">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
