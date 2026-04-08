import { addMonths, format } from "date-fns";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CalendarGrid from "../components/CalendarGrid";
import { useMood } from "../context/MoodContext";

const CalendarPage = () => {
  const [monthDate, setMonthDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const { fetchCalendar } = useMood();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await fetchCalendar(monthDate.getMonth() + 1, monthDate.getFullYear());
      setEntries(data);
    };
    load();
  }, [monthDate]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 rounded-2xl border border-white/20 bg-white/70 p-6 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setMonthDate((prev) => addMonths(prev, -1))} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
          <ChevronLeft />
        </button>
        <h1 className="font-display text-2xl font-bold">{format(monthDate, "MMMM yyyy")}</h1>
        <button type="button" onClick={() => setMonthDate((prev) => addMonths(prev, 1))} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
          <ChevronRight />
        </button>
      </div>

      <CalendarGrid
        monthDate={monthDate}
        entries={entries}
        onSelectDate={(day) => {
          navigate(`/add?date=${format(day, "yyyy-MM-dd")}`);
        }}
      />
    </motion.div>
  );
};

export default CalendarPage;
