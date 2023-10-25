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

// const deleteUser = async (req, res) => {
//     try {
//     const
//     }catch (error){
//         res.status(500).json({message: error.message})
//     }
// }

module.exports = {
    getAllUser,
    getUserByEmail,
    newUser,
    updateUser
};