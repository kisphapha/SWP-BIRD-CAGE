const component = require("../models/Component");

const getAllComponent = async (req, res) => {
    try {
        const Component = await component.getAllComponent();
        res.json(Component);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllComponent
}
