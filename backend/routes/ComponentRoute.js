const express = require("express");
const ComponentConntroller = require("../controllers/ComponentController");

const ComponentRouter = express();

ComponentRouter.get("/getAllComponent", ComponentConntroller.getAllComponent);
ComponentRouter.get("/getAllComponentByCate/:cateID", ComponentConntroller.getComponentByCate)

module.exports = ComponentRouter