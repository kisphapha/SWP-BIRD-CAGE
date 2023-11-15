const Category = require("../models/Category")


const getAll = async (req, res) => {
    try {
        const categories = await Category.getAllCategory();
        res.json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getACategory = async (req, res) => {
    try {
        const categories = await Category.getACategory(req.params.id);
        res.json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateCategory = async (req, res) => {
    try {
        const name  = req.body.name;
        const imageUrl = req.query.imageUrl;
        const Allow_Customize = req.query.Allow_Customize;
        const Id = req.query.Id;
        const categories = await Category.updateCategory(name, imageUrl, Allow_Customize, Id);
        res.json(categories);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.deteleCategory(req.params.id);
        res.json("delete success");
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

const addCategory = async (req, res) => {
    try {
        const category = await Category.addCategory(req.body.id, req.body.name, req.body.imageU, req.body.Allow_Customize, req.body.isHide);
    }catch (error){
        res.status(500).json({message: error.message})
    }
}
    

module.exports = {
    getAll,
    updateCategory,
    deleteCategory,
    addCategory,
    getACategory
}