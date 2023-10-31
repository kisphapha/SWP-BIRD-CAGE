const express = require("express");
const OrderController = require("../controllers/OrderController");

const OrderRouter = express.Router();

// no parameter
OrderRouter.route("/").get(OrderController.getAllOrder);


OrderRouter.route("/:id").get(OrderController.getOrderById);

OrderRouter.route("/addordertodb").post(OrderController.addOrderToDB);

OrderRouter.route("/list/:id").get(OrderController.getOrderItemByOrderID);

OrderRouter.route("/user/:id").get(OrderController.getOrderByUserId);

OrderRouter.route("/paidstatus/:id").get(OrderController.changeStatus_Paid);

OrderRouter.route("/loadUnseen/:id").get(OrderController.loadUnSeen);

OrderRouter.route("/changeToSeen").patch(OrderController.changetoSeen);


module.exports = OrderRouter;
    
