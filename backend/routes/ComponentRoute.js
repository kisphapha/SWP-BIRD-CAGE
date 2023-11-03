const express = require("express");
const ComponentController = require("../controllers/ComponentController");

const ComponentRouter = express();

ComponentRouter.get("/getAllComponent", ComponentController.getAllComponent);
ComponentRouter.get("/getAllComponentByCate/:CateID", ComponentController.getComponentByCate)
ComponentRouter.post("/filterComponent", ComponentController.filterComponent)
ComponentRouter.post("/new", ComponentController.addNewComponent)



module.exports = ComponentRouter