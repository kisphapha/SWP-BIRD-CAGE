const component = require("../models/Component");

const getAllComponent = async (req, res) => {
    try {
        // res.json(Type);
        const Component = await component.getAllComponent();
        
        res.json(Component);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getComponentByCate = async (req, res) => {
    try {
        const CateID = req.params.CateID;
        // res.json(Type);
        const Component = await component.getAllComponent(CateID);

        res.json(Component);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getAllComponent,
    getComponentByCate
}