const Category = require('../models/categoryModel');

// Obtener todos los categories
const getCategories = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Obtener un category por ID
const getCategoryByID = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id);

        /*if(!category){
            return res.status(404).json({ message: 'Category not found' });
        }*/

        res.status(200).json(category);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Crear un category
const createCategory = async (req, res) => {
    try{   
        /*if(!req.body){
            return res.status(400).json({ message: 'Missing body' });
        }*/

        const category = await Category.create({
            name: req.body.name,
            subcategories: req.body.subcategories
        });
    
        res.status(200).json(category);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Modificar un category
const updateCategory = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id);

        /*if(!category){
            return res.status(404).json({ message: 'Category not found' });
        }*/

        const update = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(update);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Borrar un category
const deleteCategory = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id);

        /*if(!category){
            return res.status(404).json({ message: 'Category not found' });
        }*/
        
        await category.deleteOne();
        res.status(200).json({message: req.params.id});
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    getCategories,
    getCategoryByID,
    updateCategory,
    createCategory,
    deleteCategory,
}