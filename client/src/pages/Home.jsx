import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMood } from "../context/MoodContext";
import { moodMap } from "../utils/mood";

const Home = () => {
  const { entries } = useMood();
  const latest = entries[0];

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/30 bg-gradient-to-br from-emerald-300/60 via-cyan-200/60 to-blue-200/60 p-8 shadow-glass dark:border-white/10 dark:from-emerald-500/20 dark:via-cyan-500/20 dark:to-blue-500/20"
      >
        <h1 className="font-display text-3xl font-bold">Track your mood. Understand your rhythm.</h1>
        <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-200">
          MoodJournal helps you log daily emotions, add reflections, and discover trends with beautiful analytics.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/add" className="rounded-xl bg-slate-900 px-5 py-2 text-white dark:bg-white dark:text-slate-900">
            Log Today
          </Link>
          <Link to="/dashboard" className="rounded-xl border border-slate-300 px-5 py-2 dark:border-slate-600">
            View Dashboard
          </Link>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/20 bg-white/70 p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
          <p className="text-sm text-slate-500">Total Entries</p>
          <p className="mt-2 text-3xl font-bold">{entries.length}</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/70 p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
          <p className="text-sm text-slate-500">Latest Mood</p>
          <p className="mt-2 text-3xl font-bold">{latest ? moodMap[latest.mood]?.emoji : "-"}</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/70 p-5 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
          <p className="text-sm text-slate-500">Latest Reflection</p>
          <p className="mt-2 text-sm">{latest?.note || "No reflection yet."}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
