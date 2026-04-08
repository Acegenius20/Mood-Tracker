import { Menu, NotebookPen } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ onMenu }) => (
  <header className="sticky top-0 z-30 flex items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-4 py-3 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50">
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
        onClick={onMenu}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>
      <div className="flex items-center gap-2 font-display text-lg font-semibold">
        <NotebookPen className="text-emerald-500" />
        MoodJournal
      </div>
    </div>
    <ThemeToggle />
  </header>
);

export default Navbar;
