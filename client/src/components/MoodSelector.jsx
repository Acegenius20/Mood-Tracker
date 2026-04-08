import { motion } from "framer-motion";
import { MOODS } from "../utils/mood";

const MoodSelector = ({ value, onChange }) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
    {MOODS.map((mood) => (
      <motion.button
        whileHover={{ y: -4 }}
        key={mood.key}
        type="button"
        onClick={() => onChange(mood.key)}
        className={`rounded-2xl border px-4 py-4 text-center shadow-soft transition ${
          value === mood.key
            ? "border-transparent text-white"
            : "border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-800/70"
        }`}
        style={value === mood.key ? { background: `linear-gradient(135deg, ${mood.color}, #0ea5e9)` } : {}}
      >
        <div className="text-2xl">{mood.emoji}</div>
        <div className="mt-1 text-sm font-medium">{mood.label}</div>
      </motion.button>
    ))}
  </div>
);

export default MoodSelector;
