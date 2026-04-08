import { useMemo, useState } from "react";
import Modal from "../components/Modal";
import EntryCard from "../components/EntryCard";
import FilterPanel from "../components/FilterPanel";
import MoodSelector from "../components/MoodSelector";
import { useMood } from "../context/MoodContext";

const History = () => {
  const { entries, updateEntry, deleteEntry, filterEntries, fetchEntries, thisWeek } = useMood();
  const [filtered, setFiltered] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editMood, setEditMood] = useState("happy");
  const [editNote, setEditNote] = useState("");
  const [editDate, setEditDate] = useState("");

  const list = useMemo(() => filtered || entries, [entries, filtered]);

  const openEdit = (entry) => {
    setEditing(entry);
    setEditMood(entry.mood);
    setEditNote(entry.note || "");
    setEditDate(entry.loggedOn.slice(0, 10));
  };

  const saveEdit = async () => {
    await updateEntry(editing._id, { mood: editMood, note: editNote, loggedOn: editDate });
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      <FilterPanel
        thisWeek={thisWeek}
        onApply={async (params) => {
          const cleaned = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== ""));
          const result = await filterEntries(cleaned);
          setFiltered(result);
        }}
        onReset={async () => {
          setFiltered(null);
          await fetchEntries();
        }}
      />

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">No entries found.</div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {list.map((entry) => (
            <EntryCard key={entry._id} entry={entry} onEdit={openEdit} onDelete={deleteEntry} />
          ))}
        </div>
      )}

      <Modal open={Boolean(editing)} title="Edit Entry" onClose={() => setEditing(null)}>
        <div className="space-y-3">
          <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800" />
          <MoodSelector value={editMood} onChange={setEditMood} />
          <textarea
            value={editNote}
            maxLength={500}
            onChange={(e) => setEditNote(e.target.value)}
            className="h-28 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          />
          <p className="text-right text-xs text-slate-500">{editNote.length}/500</p>
          <button type="button" onClick={saveEdit} className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900">
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default History;
