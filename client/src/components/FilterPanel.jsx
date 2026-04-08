import { useState } from "react";

const FilterPanel = ({ onApply, onReset, thisWeek }) => {
  const [filters, setFilters] = useState({ mood: "", startDate: "", endDate: "", week: thisWeek, month: "", year: "", search: "" });

  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-3 rounded-2xl border border-white/30 bg-white/70 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
      <h3 className="font-display text-lg font-semibold">Filters</h3>
      <div className="grid gap-3 md:grid-cols-3">
        <select value={filters.mood} onChange={(e) => update("mood", e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <option value="">All moods</option>
          <option value="happy">Happy</option>
          <option value="neutral">Neutral</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="tired">Tired</option>
        </select>
        <input type="date" value={filters.startDate} onChange={(e) => update("startDate", e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
        <input type="date" value={filters.endDate} onChange={(e) => update("endDate", e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
        <input type="text" placeholder="Week (YYYY-WW)" value={filters.week} onChange={(e) => update("week", e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
        <input type="number" min="1" max="12" placeholder="Month" value={filters.month} onChange={(e) => update("month", e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
        <input type="number" min="1970" placeholder="Year" value={filters.year} onChange={(e) => update("year", e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <input
        type="text"
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        placeholder="Search note text"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
      />
      <div className="flex gap-2">
        <button type="button" onClick={() => onApply(filters)} className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900">
          Apply
        </button>
        <button
          type="button"
          onClick={() => {
            setFilters({ mood: "", startDate: "", endDate: "", week: thisWeek, month: "", year: "", search: "" });
            onReset();
          }}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm dark:border-slate-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
