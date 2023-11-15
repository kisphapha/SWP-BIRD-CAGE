const express = require("express");
const UserController = require("../controllers/UserController");

const userRouter = express.Router();
userRouter.get("/", UserController.getAllUser);
userRouter.post("/new", UserController.newUser);
userRouter.get("/update", UserController.updateUser);
userRouter.get("/:email", UserController.getUserByEmail);
userRouter.post("/replyFeedBack", UserController.replyFeedBack);
userRouter.post("/filter", UserController.filterUser);
userRouter.post("/updatePoint", UserController.getPointForUser);
userRouter.post("/addVoucher", UserController.addVoucher);
userRouter.get("/getVoucher/:UserID", UserController.getVoucherByUserID);
userRouter.post("/exchangePoint", UserController.exchangePoint);



module.exports = userRouter;