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
    getFormatByID,
    updateFormat,
    createFormat,
    deleteFormat,
}