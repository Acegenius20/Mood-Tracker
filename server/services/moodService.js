const MoodEntry = require("../models/MoodEntry");
const { normalizeDateToUTCStart, getMonthRangeUTC } = require("../utils/date");

const createOrUpdateMoodByDay = async ({ mood, note = "", loggedOn }) => {
  const normalizedDate = normalizeDateToUTCStart(loggedOn);

  if (!normalizedDate) {
    throw new Error("Invalid date supplied");
  }

  const updated = await MoodEntry.findOneAndUpdate(
    { loggedOn: normalizedDate },
    { mood, note, loggedOn: normalizedDate },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  return updated;
};

const getAllMoods = async () => MoodEntry.find().sort({ loggedOn: -1 });

const getMoodById = async (id) => MoodEntry.findById(id);

const updateMoodById = async (id, payload) => {
  const updatePayload = { ...payload };

  if (payload.loggedOn) {
    const normalizedDate = normalizeDateToUTCStart(payload.loggedOn);
    if (!normalizedDate) {
      throw new Error("Invalid date supplied");
    }

    const duplicate = await MoodEntry.findOne({
      loggedOn: normalizedDate,
      _id: { $ne: id }
    });

    if (duplicate) {
      const err = new Error("An entry for this date already exists");
      err.statusCode = 409;
      throw err;
    }

    updatePayload.loggedOn = normalizedDate;
  }

  return MoodEntry.findByIdAndUpdate(id, updatePayload, { new: true, runValidators: true });
};

const deleteMoodById = async (id) => MoodEntry.findByIdAndDelete(id);

const getFilteredMoods = async ({ mood, startDate, endDate, week, month, year, search }) => {
  const query = {};

  if (mood) {
    query.mood = mood;
  }

  if (search) {
    query.note = { $regex: search, $options: "i" };
  }

  if (startDate || endDate) {
    query.loggedOn = {};
    if (startDate) {
      const normalizedStart = normalizeDateToUTCStart(startDate);
      if (!normalizedStart) throw new Error("Invalid startDate");
      query.loggedOn.$gte = normalizedStart;
    }
    if (endDate) {
      const normalizedEnd = normalizeDateToUTCStart(endDate);
      if (!normalizedEnd) throw new Error("Invalid endDate");
      const nextDay = new Date(normalizedEnd);
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);
      query.loggedOn.$lt = nextDay;
    }
  }

  if (week) {
    const [weekYearRaw, weekNumRaw] = String(week).split("-");
    const weekYear = Number(weekYearRaw);
    const weekNum = Number(weekNumRaw);
    if (!weekYear || !weekNum) throw new Error("Invalid week format. Use YYYY-WW");

    const jan4 = new Date(Date.UTC(weekYear, 0, 4));
    const jan4Day = jan4.getUTCDay() || 7;
    const weekStart = new Date(jan4);
    weekStart.setUTCDate(jan4.getUTCDate() - jan4Day + 1 + (weekNum - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setUTCDate(weekStart.getUTCDate() + 7);

    query.loggedOn = { ...(query.loggedOn || {}), $gte: weekStart, $lt: weekEnd };
  }

  if (month && year) {
    const m = Number(month);
    const y = Number(year);
    if (m < 1 || m > 12 || !y) throw new Error("Invalid month/year");
    const { start, end } = getMonthRangeUTC(y, m);
    query.loggedOn = { ...(query.loggedOn || {}), $gte: start, $lt: end };
  }

  return MoodEntry.find(query).sort({ loggedOn: -1 });
};

const getWeeklySummary = async () => {
  const now = new Date();
  const sevenDaysAgo = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 6));

  const rows = await MoodEntry.aggregate([
    { $match: { loggedOn: { $gte: sevenDaysAgo } } },
    { $group: { _id: "$mood", count: { $sum: 1 } } }
  ]);

  const base = { happy: 0, neutral: 0, sad: 0, angry: 0, tired: 0 };

  rows.forEach((row) => {
    base[row._id] = row.count;
  });

  const totalEntries = Object.values(base).reduce((sum, count) => sum + count, 0);
  const mostFrequentMood = Object.entries(base).sort((a, b) => b[1] - a[1])[0]?.[0] || "none";

  return {
    ...base,
    mostFrequentMood,
    totalEntries
  };
};

const getCalendarMonth = async ({ year, month }) => {
  const y = Number(year);
  const m = Number(month);
  if (m < 1 || m > 12 || !y) throw new Error("Invalid month/year");

  const { start, end } = getMonthRangeUTC(y, m);

  return MoodEntry.find(
    { loggedOn: { $gte: start, $lt: end } },
    { mood: 1, note: 1, loggedOn: 1, createdAt: 1, updatedAt: 1 }
  ).sort({ loggedOn: 1 });
};

const getDashboardStats = async () => {
  const now = new Date();
  const thirtyDaysAgo = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 29));

  const entries = await MoodEntry.find({ loggedOn: { $gte: thirtyDaysAgo } }).sort({ loggedOn: 1 });

  const distribution = { happy: 0, neutral: 0, sad: 0, angry: 0, tired: 0 };
  entries.forEach((entry) => {
    distribution[entry.mood] += 1;
  });

  const trend = entries.map((entry) => ({
    date: entry.loggedOn.toISOString().slice(0, 10),
    mood: entry.mood,
    score:
      entry.mood === "happy"
        ? 5
        : entry.mood === "neutral"
          ? 3
          : entry.mood === "tired"
            ? 2
            : entry.mood === "sad"
              ? 1
              : 0
  }));

  let streak = 0;
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const current = entries[i].loggedOn;
    const previous = entries[i - 1]?.loggedOn;
    if (!previous) {
      streak += 1;
      break;
    }
    const diff = Math.round((current - previous) / (1000 * 60 * 60 * 24));
    if (diff === 1) {
      streak += 1;
    } else {
      streak += 1;
      break;
    }
  }

  return {
    distribution,
    trend,
    streak,
    totalEntries: entries.length
  };
};

module.exports = {
  createOrUpdateMoodByDay,
  getAllMoods,
  getMoodById,
  updateMoodById,
  deleteMoodById,
  getFilteredMoods,
  getWeeklySummary,
  getCalendarMonth,
  getDashboardStats
};
