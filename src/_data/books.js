const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

module.exports = function () {
  const csvFile = path.join(__dirname, "../storygraph.csv");

  // Check if CSV exists
  if (!fs.existsSync(csvFile)) {
    console.warn("⚠️ storygraph.csv not found in src folder. Returning empty data.");
    return {
      currentlyReading: [],
      completed: [],
      toRead: []
    };
  }

  // Read CSV
  const csvData = fs.readFileSync(csvFile, "utf8");

  // Parse CSV
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true
  });

  // Map CSV columns to nicer field names
  const mappedBooks = records.map(r => ({
  title: r.Title || "Unknown Title",
  authors: r.Authors || "Unknown Author",
  score: r["Star Rating"] || null,
  tags: r.Tags ? r.Tags.split(",").map(t => t.trim()) : [],
  status: r["Read Status"]?.toLowerCase()
}));

  // Filter by status
const currentlyReading = mappedBooks.filter(
  b => b.status?.toLowerCase() === "currently-reading"
);

const completed = mappedBooks.filter(
  b => b.status?.toLowerCase() === "read"
);

const toRead = mappedBooks.filter(
  b => b.status?.toLowerCase() === "to-read"
);




            console.log(
        "Books loaded:",
        currentlyReading.length,
        completed.length,
        toRead.length
        );


    return {
    currentlyReading,
    completed,
    toRead
    };



};
