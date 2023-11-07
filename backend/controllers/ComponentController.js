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
        const Component = await component.getByComponentCate(CateID);

        res.json(Component);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addNewComponent = async (req, res) => {
    try {
        //id,name,category,upper_price,lower_price,upper_stock,lower_stock,status
        const name = req.body.Name;
        const category = req.body.Category;
        const material = req.body.material;
        const description = req.body.Description;
        const color = req.body.Color;
        const price = req.body.Price;
        const stock = req.body.Stock;
        const status = req.body.Status;
        const url = req.body.Urls;
        const application = req.body.Application

        const response = await component.addNewComponent(name, category, material, color, description, price, stock, status,url,application);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const filterComponent = async (req, res) => {
    try {
        //id,name,category,upper_price,lower_price,upper_stock,lower_stock,status
        const id = req.body.id;
        const name = req.body.name;
        const category = req.body.category;
        const upper_price = req.body.upper_price;
        const lower_price = req.body.lower_price;
        const upper_stock = req.body.upper_stock;
        const lower_stock = req.body.lower_stock;
        const page = req.body.page;
        const status = req.body.status;

        const response = await component.filterComponents(id, name, category, upper_price, lower_price, upper_stock, lower_stock, status, page);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}



module.exports = {
    getAllComponent,
    getComponentByCate,
    filterComponent,
    addNewComponent
}