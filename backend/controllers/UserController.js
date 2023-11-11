const User = require("../models/User");

const getAllUser = async (req, res) => {
    try {
        const user = await User.getAllUser();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const user = await User.getUserByEmail(req.params.email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const newUser = async (req, res) => {
    try {
        const name = req.query.name;
        const email = req.query.email;
        const picture = req.query.picture;
        await User.newUser(name, email, picture);
        res.json({ message: "done" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateUser = async (req, res) => {
    try {
        const name = req.query.name;
        const email = req.query.email;
        const phone = req.query.phone;
        const dob = req.query.dob;
        const user = await User.updateUser(name, email, phone, dob);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getPointForUser = async (req, res) =>{
    try {
        const id = req.body.id;
        const point = req.body.point;

        await User.getPointForUser(id, point);
        res.json({message: "success"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const filterUser = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const dob = req.body.dob;
        const role = req.body.role;
        const status = req.body.status;
        const lower_point = req.body.lower_point;
        const upper_point = req.body.upper_point;
        const create = req.body.create;
        const page = req.body.page;
        const user = await User.filterUser(name, email, phone, dob, lower_point, upper_point, create, status, role, page);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUser,
    getUserByEmail,
    newUser,
    updateUser,
    getPointForUser,
    filterUser
};