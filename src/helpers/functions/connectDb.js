const { log } = require("./log.js");



const mongoose = require("mongoose");
const uri =
  process.env.NODE_ENV === "developing"
    ? process.env.DB_TEST_URL
    : process.env.DB_URL;

log("Connecting to MongoDB", "warn");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

db.once("open", () => {
  log("Connected to MongoDB", "success");
});

db.on("error", () => {
  log("Error connecting to MongoDB", "error");
});

db.on("disconnected", () => {
  log("Disconnected from MongoDB", "warn");
});

process.on("SIGINT", async () => {
  await db.close();
  process.exit(0);
});

module.exports = mongoose;