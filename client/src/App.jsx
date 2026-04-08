import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import AddMood from "./pages/AddMood";
import CalendarPage from "./pages/CalendarPage";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useMood } from "./context/MoodContext";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast, closeToast } = useMood();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(closeToast, 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#d9f99d_0%,#e0f2fe_40%,#f8fafc_100%)] px-4 pb-6 pt-4 font-body text-slate-900 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top,#0f172a_0%,#111827_45%,#020617_100%)] dark:text-slate-100 md:px-6">
      <div className="mx-auto flex max-w-7xl gap-4">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 space-y-4">
          <Navbar onMenu={() => setSidebarOpen((prev) => !prev)} />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddMood />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </main>
      </div>
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
};

export default App;
