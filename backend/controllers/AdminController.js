const Admin =  require("../models/Admin");


const getOrderBy5Month = async (req, res) => {
    try {
        const admin = await Admin.getOrderBy5Month();
        res.json(admin);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

const getBestSellingProducts = async (req, res) => {
    try {
        const admin = await Admin.getBestSellingProducts();
        res.json(admin);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

const getAllUser = async (req, res) => {
    try {
        const admin = await Admin.getAllUser();
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const newUser = async (req, res) => {
    try {
        const name = req.query.name;
        const email = req.query.email;
        const picture = req.query.picture;
        await Admin.newUser(name, email, picture);
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

        await Admin.updateUser(name, email, phone, dob);
        res.json({ message: "done" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.body.userId
        const status = req.body.status
        const reasonBlock = req.body.ReasonBlock
        const admin = await Admin.deleteUser(id,status,reasonBlock);
        res.json("delete success");
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

const loadUnSeen = async (req, res) => {
    try {
        const order = await Admin.loadUnSeen();
        res.json(order);
    } catch (error) {
        res.status(500).json({message: e.message})
    }
}

const changetoSeen = async(req, res) => {
    try {
        const order = await Admin.changetoSeen();
        res.json("Success");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getMonthLyIncome = async (req, res) => {
    try {
        const admin = await Admin.getMonthLyIncome();
        res.json(admin);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteJunkData = async (req, res) => {
    try {
        const admin = await Admin.deleteJunkData();
        res.json("Success");
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



const orderStatisticByMonth = async (req, res) => {
    try {
        const month = req.body.month
        const year = req.body.year
        const statistic = await Admin.orderStatisticByMonth(month,year);
        res.json(statistic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getOrderBy5Month,
    getBestSellingProducts,
    getAllUser,
    newUser,
    updateUser,
    deleteUser,
    loadUnSeen,
    changetoSeen,
    getMonthLyIncome,
    deleteJunkData,
    orderStatisticByMonth
}