import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { format, getISOWeek } from "date-fns";
import api from "../api/axios";

const MoodContext = createContext(null);

export const MoodProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  };

  const closeToast = () => setToast(null);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/moods");
      setEntries(data);
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to load entries", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const upsertEntry = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/moods", payload);
      setEntries((prev) => {
        const exists = prev.some((entry) => entry._id === data._id);
        if (exists) {
          return prev.map((entry) => (entry._id === data._id ? data : entry));
        }

        const sameDay = prev.find((entry) => format(new Date(entry.loggedOn), "yyyy-MM-dd") === format(new Date(data.loggedOn), "yyyy-MM-dd"));
        if (sameDay) {
          return prev.map((entry) => (entry._id === sameDay._id ? data : entry));
        }

        return [data, ...prev];
      });
      showToast("Mood saved successfully");
      return data;
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to save mood", "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateEntry = async (id, payload) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/api/moods/${id}`, payload);
      setEntries((prev) => prev.map((entry) => (entry._id === id ? data : entry)));
      showToast("Entry updated");
      return data;
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update entry", "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/api/moods/${id}`);
      setEntries((prev) => prev.filter((entry) => entry._id !== id));
      showToast("Entry deleted");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to delete entry", "error");
    } finally {
      setLoading(false);
    }
  };

  const filterEntries = async (params) => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/moods/filter", { params });
      return data;
    } catch (error) {
      showToast(error.response?.data?.message || "Filter failed", "error");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchCalendar = async (month, year) => {
    const { data } = await api.get("/api/moods/calendar", { params: { month, year } });
    return data;
  };

  const fetchWeeklySummary = async () => {
    const { data } = await api.get("/api/moods/weekly-summary");
    return data;
  };

  const fetchDashboard = async () => {
    const { data } = await api.get("/api/moods/dashboard");
    return data;
  };

  const thisWeek = `${new Date().getFullYear()}-${String(getISOWeek(new Date())).padStart(2, "0")}`;

  const value = useMemo(
    () => ({
      entries,
      loading,
      toast,
      showToast,
      closeToast,
      fetchEntries,
      upsertEntry,
      updateEntry,
      deleteEntry,
      filterEntries,
      fetchCalendar,
      fetchWeeklySummary,
      fetchDashboard,
      thisWeek
    }),
    [entries, loading, toast]
  );

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood must be used inside MoodProvider");
  }
  return context;
};
