const Address = require("../models/Address");

const newAddress = async (req, res) => {
    try {
        const id = req.query.id;
        const city = req.query.city;
        const district = req.query.district;
        const ward = req.query.ward;
        const location = req.query.location;
        const userid = req.query.userid
        await Address.newAddress(city, district, ward, location,userid);
        res.json({ message: "done" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAddressOfUser = async (req, res) => {
    try {
        const addresses = await Address.getAddressOfUser(req.params.code);
        res.json(addresses)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const updateAddress = async (req, res) => {
    try {
        const id = req.body.id;
        const city = req.body.city;
        const district = req.body.district;
        const ward = req.body.ward;
        const location = req.body.location;
        await Address.updateAddress(id, location, ward, district, city );
        res.json({ message: "done" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteAddress = async (req, res) => {
    try {
        const id = req.params.id;
        await Address.deleteAddress(id);
        res.json({ message: "done" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    newAddress,
    getAddressOfUser,
    updateAddress,
    deleteAddress
}