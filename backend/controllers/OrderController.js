const Order = require("../models/Order");

const getAllOrder = async (req, res) => {
    try {
        const order = await Order.getAllOrder();
        res.json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getOrderById = async (req, res) => {
    try {
        const products = await Order.getOrderById(req.params.id);
        res.json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addOrderToDB = async (req, res) => {
    try {
        const UserID = req.query.UserID;
        const OrderDate = req.query.OrderDate;
        const PaymentDate = req.query.PaymentDate;
        const ShippingAddress = req.query.ShippingAddress;
        const PhoneNumber = req.query.PhoneNumber;
        const Note = req.query.Note;
        const TotalAmount = req.query.TotalAmount;
        const PaymentId = req.query.PaymentId;
        const Status = req.query.Status;

        await Order.addOrderToDB(UserID, OrderDate, PaymentDate, ShippingAddress, PhoneNumber, Note, TotalAmount, PaymentId, Status);
        res.json({ message: "done" });
    }catch (e){
        res.status(500).json({message: e.message});
    }
}

const getAllOrderItemByUserID = async (req, res) => {
    try {
        const order = await Order.getAllOrderItemByUserID(req.params.id);
        res.json(order);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

const changeStatus_Paid  =async(req, res) => {
    try {
        const order = await Order.changeStatus_Paid(req.params.id);
        res.json("success");
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    addOrderToDB,
    getAllOrderItemByUserID,
    changeStatus_Paid
}

