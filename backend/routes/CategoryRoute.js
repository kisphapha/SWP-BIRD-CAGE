const express = require("express");
const CategoryController = require("../controllers/CategoryController")

const  categoryRouter = express.Router();
categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getACategory);
categoryRouter.post("/update", CategoryController.updateCategory )
categoryRouter.delete("/delete", CategoryController.deleteCategory);
categoryRouter.post("/add", CategoryController.addCategory);



module.exports = categoryRouter;