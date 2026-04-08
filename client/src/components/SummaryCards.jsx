import { moodMap, MOODS } from "../utils/mood";

const SummaryCards = ({ summary }) => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
    {MOODS.map((mood) => (
      <div key={mood.key} className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
        <p className="text-sm text-slate-500 dark:text-slate-400">{moodMap[mood.key].label}</p>
        <p className="mt-2 text-2xl font-semibold">{summary?.[mood.key] ?? 0}</p>
      </div>
    ))}
  </div>
);

export default SummaryCards;
