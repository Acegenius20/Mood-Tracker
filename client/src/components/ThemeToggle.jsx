import { MonitorCog, MoonStar, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const options = [
  { key: "light", icon: Sun, label: "Light" },
  { key: "dark", icon: MoonStar, label: "Dark" },
  { key: "system", icon: MonitorCog, label: "System" }
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-full bg-white/50 p-1 shadow-soft backdrop-blur dark:bg-white/10">
      {options.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => setTheme(key)}
          className={`rounded-full px-3 py-1.5 text-xs transition ${
            theme === key
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "text-slate-700 hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/20"
          }`}
          aria-label={label}
          title={label}
        >
          <Icon size={15} className="inline" />
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
