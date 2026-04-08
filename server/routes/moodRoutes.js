const express = require("express");
const { body, query, param } = require("express-validator");
const moodController = require("../controllers/moodController");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

const moodValidation = [
  body("mood").isIn(["happy", "neutral", "sad", "angry", "tired"]),
  body("note").optional().isString().isLength({ max: 500 }),
  body("loggedOn").isISO8601()
];

router.post("/", moodValidation, validateRequest, moodController.createMood);
router.get("/", moodController.getMoods);
router.get(
  "/filter",
  [
    query("mood").optional().isIn(["happy", "neutral", "sad", "angry", "tired"]),
    query("startDate").optional().isISO8601(),
    query("endDate").optional().isISO8601(),
    query("month").optional().isInt({ min: 1, max: 12 }),
    query("year").optional().isInt({ min: 1970 })
  ],
  validateRequest,
  moodController.filterMoods
);
router.get("/weekly-summary", moodController.weeklySummary);
router.get(
  "/calendar",
  [query("month").isInt({ min: 1, max: 12 }), query("year").isInt({ min: 1970 })],
  validateRequest,
  moodController.calendar
);
router.get("/dashboard", moodController.dashboard);
router.get("/:id", [param("id").isMongoId()], validateRequest, moodController.getMoodById);
router.put(
  "/:id",
  [param("id").isMongoId(), ...moodValidation.map((rule) => rule.optional())],
  validateRequest,
  moodController.updateMood
);
router.delete("/:id", [param("id").isMongoId()], validateRequest, moodController.deleteMood);

module.exports = router;
