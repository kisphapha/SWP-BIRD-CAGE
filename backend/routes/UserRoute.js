const express = require("express");
const UserController = require("../controllers/UserController");

const userRouter = express.Router();
userRouter.get("/", UserController.getAllUser);
userRouter.post("/new", UserController.newUser);
userRouter.get("/update", UserController.updateUser);
userRouter.get("/:email", UserController.getUserByEmail);


module.exports = userRouter;