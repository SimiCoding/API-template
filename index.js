// Requirements
const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv").config({ path: ".env.development" });

const morgan = require("morgan");

const { log } = require("./src/helpers/functions/log.js");

// Initialize MongoDB

require("./src/helpers/functions/connectDb.js");

// Configure Cors Options

const corsOptions = { origin: process.env.ALLOW_ORIGIN }

// Initialize App

const app = express();

// Configure App

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors(corsOptions));

// Response Handler middleware
app.use(require("./src/helpers/handlers/responseHandler/index"))

// Configure Routes

app.use(require("./src/routes/index"));

// Start App

app.listen(process.env.PORT, () => {
  log(`Listening on Port ${process.env.PORT}`, "success");
});