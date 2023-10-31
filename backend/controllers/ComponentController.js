const component = require("../models/Component");

const getAllComponent = async (req, res) => {
    try {
        const CateID = req.query.CateID;
        // res.json(Type);
        const Component = await component.getAllComponent(CateID);
        
        res.json(Component);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getAllComponent
}