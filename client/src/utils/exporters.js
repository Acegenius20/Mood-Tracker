export const exportJSON = (entries) => {
  const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "moodjournal-export.json";
  link.click();
  URL.revokeObjectURL(url);
};

export const exportCSV = (entries) => {
  const headers = ["id", "mood", "note", "loggedOn", "createdAt", "updatedAt"];
  const rows = entries.map((entry) =>
    [entry._id, entry.mood, (entry.note || "").replace(/"/g, '""'), entry.loggedOn, entry.createdAt, entry.updatedAt]
      .map((value) => `"${value ?? ""}"`)
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "moodjournal-export.csv";
  link.click();
  URL.revokeObjectURL(url);
};
