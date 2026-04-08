import { eachDayOfInterval, endOfMonth, format, startOfMonth, startOfWeek, endOfWeek, isToday } from "date-fns";
import { moodMap } from "../utils/mood";

const CalendarGrid = ({ monthDate, entries, onSelectDate }) => {
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  const entryByDate = Object.fromEntries(entries.map((entry) => [format(new Date(entry.loggedOn), "yyyy-MM-dd"), entry]));

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const key = format(day, "yyyy-MM-dd");
        const entry = entryByDate[key];
        const mood = entry ? moodMap[entry.mood] : null;
        const inMonth = day.getMonth() === monthDate.getMonth();

        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelectDate(day, entry)}
            className={`min-h-20 rounded-xl border p-2 text-left transition ${
              inMonth
                ? "border-white/20 bg-white/70 dark:border-white/10 dark:bg-slate-900/60"
                : "border-transparent bg-slate-100/50 text-slate-400 dark:bg-slate-800/30"
            } ${isToday(day) ? "ring-2 ring-cyan-400" : ""}`}
          >
            <p className="text-xs">{format(day, "d")}</p>
            {mood ? (
              <div className="mt-2 rounded-lg px-2 py-1 text-center text-xs font-semibold text-white" style={{ backgroundColor: mood.color }}>
                {mood.emoji} {mood.label}
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
