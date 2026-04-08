export const MOODS = [
  { key: "happy", label: "Happy", emoji: "😊", color: "#22c55e" },
  { key: "neutral", label: "Neutral", emoji: "😐", color: "#0ea5e9" },
  { key: "sad", label: "Sad", emoji: "😔", color: "#6366f1" },
  { key: "angry", label: "Angry", emoji: "😤", color: "#ef4444" },
  { key: "tired", label: "Tired", emoji: "😴", color: "#f59e0b" }
];

export const moodMap = Object.fromEntries(MOODS.map((m) => [m.key, m]));
