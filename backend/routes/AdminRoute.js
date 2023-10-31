const express = require('express');
const AdminController = require("../controllers/AdminController");


const AdminRouter = express();

AdminRouter.get("/get5Month", AdminController.getOrderBy5Month);

AdminRouter.get("/getBestSelling", AdminController.getBestSellingProducts);

AdminRouter.get("/getUsers", AdminController.getAllUser);

AdminRouter.post("/deleteUser", AdminController.deleteUser);

AdminRouter.get("/updateUser", AdminController.updateUser);

AdminRouter.route("/loadUnseen/:id").get(AdminController.loadUnSeen);

AdminRouter.route("/changeToSeen").patch(AdminController.changetoSeen);

AdminRouter.route("/statistic").post(AdminController.orderStatisticByMonth)


module.exports = AdminRouter;