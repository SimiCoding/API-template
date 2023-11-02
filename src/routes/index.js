const express = require("express");
const Router = express.Router();

const indexController = require("../controllers/indexController")

// Index Route
Router.route("/").get(indexController.index);

module.exports = Router;
