import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { moodMap } from "../utils/mood";

const EntryCard = ({ entry, onEdit, onDelete }) => {
  const mood = moodMap[entry.mood];

  return (
    <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{mood?.emoji}</span>
          <div>
            <p className="font-semibold">{mood?.label}</p>
            <p className="text-xs text-slate-500">{format(new Date(entry.loggedOn), "PPP")}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => onEdit(entry)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Pencil size={16} />
          </button>
          <button type="button" onClick={() => onDelete(entry._id)} className="rounded-lg p-2 hover:bg-rose-50 dark:hover:bg-rose-950/50">
            <Trash2 size={16} className="text-rose-500" />
          </button>
        </div>
      </div>
      {entry.note ? <p className="text-sm text-slate-700 dark:text-slate-200">{entry.note}</p> : <p className="text-sm italic text-slate-400">No reflection note.</p>}
    </div>
  );
};

export default EntryCard;
