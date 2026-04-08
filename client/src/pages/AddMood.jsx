import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import MoodSelector from "../components/MoodSelector";
import { useMood } from "../context/MoodContext";

const AddMood = () => {
  const { entries, upsertEntry, loading } = useMood();
  const [searchParams] = useSearchParams();
  const [mood, setMood] = useState("happy");
  const [note, setNote] = useState("");
  const [loggedOn, setLoggedOn] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    const draft = localStorage.getItem("moodjournal-draft");
    if (draft) {
      const parsed = JSON.parse(draft);
      setMood(parsed.mood || "happy");
      setNote(parsed.note || "");
      setLoggedOn(parsed.loggedOn || format(new Date(), "yyyy-MM-dd"));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("moodjournal-draft", JSON.stringify({ mood, note, loggedOn }));
  }, [mood, note, loggedOn]);

  useEffect(() => {
    const pickedDate = searchParams.get("date");
    if (!pickedDate) return;

    setLoggedOn(pickedDate);
    const found = entries.find((entry) => entry.loggedOn.slice(0, 10) === pickedDate);
    if (found) {
      setMood(found.mood);
      setNote(found.note || "");
    }
  }, [searchParams, entries]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await upsertEntry({ mood, note, loggedOn });
    localStorage.removeItem("moodjournal-draft");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/20 bg-white/70 p-6 shadow-soft dark:border-white/10 dark:bg-slate-900/60">
      <h1 className="font-display text-2xl font-bold">Add Daily Mood</h1>
      <label className="block text-sm font-medium">Select date</label>
      <input
        type="date"
        value={loggedOn}
        onChange={(e) => setLoggedOn(e.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
      />

      <div>
        <p className="mb-2 text-sm font-medium">Choose your mood</p>
        <MoodSelector value={mood} onChange={setMood} />
      </div>

      <div>
        <label htmlFor="note" className="mb-2 block text-sm font-medium">
          Reflection (optional)
        </label>
        <textarea
          id="note"
          value={note}
          maxLength={500}
          onChange={(e) => setNote(e.target.value)}
          className="h-36 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          placeholder="How did your day feel?"
        />
        <p className="mt-1 text-right text-xs text-slate-500">{note.length}/500</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2 text-white disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Entry"}
      </button>
    </form>
  );
};

export default AddMood;
