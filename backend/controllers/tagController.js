const Tag = require('../models/tagModel');

// Obtener todos los tags
const getTags = async (req, res) => {
    try{
        const tags = await Tag.find();
        res.status(200).json(tags);
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Obtener un tag por ID
const getTagByID = async (req, res) => {
    try{
        const tag = await Tag.findById(req.params.id);

        /*if(!tag){
            return res.status(404).json({ message: 'Tag not found' });
        }*/

        res.status(200).json(tag);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Crear un tag
const createTag = async (req, res) => {
    try{   
        /*if(!req.body){
            return res.status(400).json({ message: 'Missing body' });
        }*/

        const tag = await Tag.create({
            name: req.body.name
        });
    
        res.status(200).json(tag);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Modificar un tag
const updateTag = async (req, res) => {
    try{
        const tag = await Tag.findById(req.params.id);

        /*if(!tag){
            return res.status(404).json({ message: 'Tag not found' });
        }*/

        const update = await Tag.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(update);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Borrar un tag
const deleteTag = async (req, res) => {
    try{
        const tag = await Tag.findById(req.params.id);

        /*if(!tag){
            return res.status(404).json({ message: 'Tag not found' });
        }*/
        
        await tag.deleteOne();
        res.status(200).json({message: req.params.id});
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    getTags,
    getTagByID,
    updateTag,
    createTag,
    deleteTag,
}