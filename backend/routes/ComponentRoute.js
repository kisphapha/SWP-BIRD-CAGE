const express = require("express");
const ComponentController = require("../controllers/ComponentController");

const ComponentRouter = express();

ComponentRouter.get("/getAllComponent", ComponentController.getAllComponent);

module.exports = ComponentRouter