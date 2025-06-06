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

// Crear varios tags
/*const createTags = async (req, res) => {
    try {
        const names = req.body.names;

        if (!Array.isArray(names) || names.length === 0) {
            return res.status(400).json({ message: 'No tag names provided' });
        }

        const existingTags = await Tag.find({ name: { $in: uniqueNames } });
        const existingNames = existingTags.map(tag => tag.name);

        const newNames = uniqueNames.filter(name => !existingNames.includes(name));
        const tagsToCreate = newNames.map(name => ({ name }));
        // const tagsToCreate = names.map(name => ({ name }));

        const createdTags = await Tag.insertMany(tagsToCreate);

        res.status(200).json(createdTags);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};*/

const createTags = async (req, res) => {
    try {
        const names = req.body.tags;

        // Verificamos que se haya enviado un arreglo con nombres
        if (!Array.isArray(names) || names.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron nombres de tags' });
        }

        // Eliminamos duplicados y espacios en blanco al inicio y final de cada nombre
        const uniqueNames = [...new Set(names.map(name => name.trim()))];

        // Buscamos en la base de datos los tags que ya existen con esos nombres
        const existingTags = await Tag.find({ name: { $in: uniqueNames } });
        const existingNames = existingTags.map(tag => tag.name);

        // Filtramos para quedarnos solo con los nombres nuevos que no existen aún
        const newNames = uniqueNames.filter(name => !existingNames.includes(name));

        // Creamos los objetos para insertar en la base de datos
        const tagsToCreate = newNames.map(name => ({ name }));

        // Insertamos los nuevos tags en la base de datos
        const createdTags = await Tag.insertMany(tagsToCreate);

        // Respondemos con los tags creados
        res.status(200).json(createdTags);
    } catch (error) {
        // En caso de error, respondemos con un mensaje y el error
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};




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
    createTags,
}