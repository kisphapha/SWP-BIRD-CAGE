const Order = require("../models/Order");

const getAllOrder = async (req, res) => {
    try {
        const order = await Order.getAllOrder();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const products = await Order.getOrderById(req.params.id);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getOrderByUserId = async (req, res) => {
    try {
        const products = await Order.getOrderByUserId(req.params.id);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addOrderToDB = async (req, res) => {
    try {
        const UserID = req.body.UserID;
        const OrderDate = req.body.OrderDate;
        const PaymentDate = req.body.PaymentDate;
        const ShippingAddress = req.body.AddressID;
        const PhoneNumber = req.body.PhoneNumber;
        const Note = req.body.Note;
        const TotalAmount = req.body.TotalAmount;
        const PaymentId = req.body.PaymentId;
        const Status = req.body.Status;
        const Items = req.body.Items;

        var id = await Order.addOrderToDB(UserID, OrderDate, PaymentDate, ShippingAddress, PhoneNumber, Note, TotalAmount, PaymentId, Status, Items);
        res.json({
            message: "done",
            orderid: id
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getOrderItemByOrderID = async (req, res) => {
    try {
        const order = await Order.getAllOrderItemByOrderID(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const changeStatus_Paid = async (req, res) => {
    try {
        const order = await Order.changeStatus_Paid(req.params.id);
        res.json("success");
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const loadUnSeen = async (req, res) => {
    try {
        const order = await Order.loadUnSeen(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: e.message })
    }
}

// cach dung cho tui frontend (luc user bam vao cai chuong thi no gui 2 tham so la id vs status = 1 xuong)
const changetoSeen = async (req, res) => {
    try {
        const id = req.body.id;
        const userid = req.body.userid;
        const respone = await Order.changetoSeen(id, userid);
        res.json({ status: "Success", result: respone });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    addOrderToDB,
    getOrderItemByOrderID,
    getOrderByUserId,
    changeStatus_Paid,
    loadUnSeen,
    changetoSeen
}

