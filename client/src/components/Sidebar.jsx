import { Link, useLocation } from "react-router-dom";
import { CalendarDays, ChartNoAxesCombined, House, PlusSquare, Settings, History } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", icon: House },
  { to: "/add", label: "Add Mood", icon: PlusSquare },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/dashboard", label: "Dashboard", icon: ChartNoAxesCombined },
  { to: "/history", label: "History", icon: History },
  { to: "/settings", label: "Settings", icon: Settings }
];

const Sidebar = ({ open, onClose }) => {
  const { pathname } = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/20 bg-white/70 p-5 shadow-glass backdrop-blur-xl transition-transform dark:border-white/10 dark:bg-slate-900/60 md:static md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-6 flex items-center justify-between md:hidden">
        <h2 className="font-display text-xl font-semibold">Menu</h2>
        <button type="button" onClick={onClose} className="text-sm text-slate-600 dark:text-slate-300">
          Close
        </button>
      </div>
      <nav className="space-y-2">
        {navLinks.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-gradient-to-r from-emerald-400 to-cyan-500 text-white"
                  : "hover:bg-white/90 dark:hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
