const moodService = require("../services/moodService");

const createMood = async (req, res, next) => {
  try {
    const saved = await moodService.createOrUpdateMoodByDay(req.body);
    res.status(200).json(saved);
  } catch (error) {
    next(error);
  }
};

const getMoods = async (req, res, next) => {
  try {
    const moods = await moodService.getAllMoods();
    res.json(moods);
  } catch (error) {
    next(error);
  }
};

const getMoodById = async (req, res, next) => {
  try {
    const mood = await moodService.getMoodById(req.params.id);
    if (!mood) {
      res.status(404);
      throw new Error("Mood entry not found");
    }
    res.json(mood);
  } catch (error) {
    next(error);
  }
};

const updateMood = async (req, res, next) => {
  try {
    const mood = await moodService.updateMoodById(req.params.id, req.body);
    if (!mood) {
      res.status(404);
      throw new Error("Mood entry not found");
    }
    res.json(mood);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode);
    }
    next(error);
  }
};

const deleteMood = async (req, res, next) => {
  try {
    const mood = await moodService.deleteMoodById(req.params.id);
    if (!mood) {
      res.status(404);
      throw new Error("Mood entry not found");
    }
    res.json({ message: "Entry deleted" });
  } catch (error) {
    next(error);
  }
};

const filterMoods = async (req, res, next) => {
  try {
    const result = await moodService.getFilteredMoods(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const weeklySummary = async (req, res, next) => {
  try {
    const result = await moodService.getWeeklySummary();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const calendar = async (req, res, next) => {
  try {
    const result = await moodService.getCalendarMonth(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const dashboard = async (req, res, next) => {
  try {
    const result = await moodService.getDashboardStats();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMood,
  getMoods,
  getMoodById,
  updateMood,
  deleteMood,
  filterMoods,
  weeklySummary,
  calendar,
  dashboard
};
