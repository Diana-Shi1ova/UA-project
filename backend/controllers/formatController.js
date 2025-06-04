const Format = require('../models/formatModel');

// Obtener todos los categories
const getFormats = async (req, res) => {
    try{
        const categories = await Format.find();
        res.status(200).json(categories);
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Obtener formatos agrupados por categoría
/*const getFormatsByCategory = async (req, res) => {
    try {
        const result = await Format.aggregate([
            { $group: { _id: "$category", formats: { $push: "$extention" } } },
            { $project: { _id: 0, category: "$_id", formats: 1 } }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}*/

// Obtener formatos agrupados por categoría
const getFormatsByCategory = async (req, res) => {
    try {
        const result = await Format.aggregate([
        {
            $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryInfo"
            }
        },
        {
            $unwind: "$categoryInfo"
        },
        {
            $group: {
            _id: "$category",
            categoryName: { $first: "$categoryInfo.name" },
            formats: { $addToSet: "$extention" }
            }
        },
        {
            $project: {
            _id: 0,
            categoryId: "$_id",
            categoryName: 1,
            formats: 1
            }
        }
        ]);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Obtener un format por ID
const getFormatByID = async (req, res) => {
    try{
        const format = await Format.findById(req.params.id);

        /*if(!format){
            return res.status(404).json({ message: 'Format not found' });
        }*/

        res.status(200).json(format);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Crear un format
const createFormat = async (req, res) => {
    try{   
        /*if(!req.body){
            return res.status(400).json({ message: 'Missing body' });
        }*/

        const format = await Format.create({
            extention: req.body.extention,
            name: req.body.name,
            category: req.body.category
        });
    
        res.status(200).json(format);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Modificar un format
const updateFormat = async (req, res) => {
    try{
        const format = await Format.findById(req.params.id);

        /*if(!format){
            return res.status(404).json({ message: 'Format not found' });
        }*/

        const update = await Format.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(update);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Borrar un format
const deleteFormat = async (req, res) => {
    try{
        const format = await Format.findById(req.params.id);

        /*if(!format){
            return res.status(404).json({ message: 'Format not found' });
        }*/
        
        await format.deleteOne();
        res.status(200).json({message: req.params.id});
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    getFormats,
    getFormatsByCategory,
    getFormatByID,
    updateFormat,
    createFormat,
    deleteFormat,
}