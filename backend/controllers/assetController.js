const Asset = require('../models/assetModel');

const { uploadFile } = require('../supabase/supabaseService'); // Supabase

// Obtener todos los assets
const getAssets = async (req, res) => {
    try{
        const assets = await Asset.find();
        res.status(200).json(assets);
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Obtener un asset por ID
const getAssetByID = async (req, res) => {
    try{
        const asset = await Asset.findById(req.params.id);

        /*if(!asset){
            return res.status(404).json({ message: 'Asset not found' });
        }*/

        res.status(200).json(asset);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Crear un asset
const createAsset = async (req, res) => {
    try{   
        /*if(!req.body){
            return res.status(400).json({ message: 'Missing body' });
        }*/

        // Supadase
        /*try {
            const file = req.file; // multer должен быть настроен
            const supaFile = await uploadFile(file.buffer, file.originalname, file.mimetype);
            res.status(200).json({ path: supaFile.path });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }*/

            
        // Otro Supabase
        /*try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
        
            const uploaded = await uploadFile(file.buffer, file.originalname, file.mimetype);
            const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/assets/${uploaded.path}`;
        
            res.status(200).json({ url: publicUrl });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }*/

        const asset = await Asset.create({
            name: req.body.name,
            description: req.body.description,
            categories: req.body.categories,
            tags: req.body.tags,
            downloadUrls: req.body.downloadUrls,
            previews: req.body.previews,
            author: req.body.author,
            likes: req.body.likes,
        });
    
        res.status(200).json(asset);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Modificar un asset
const updateAsset = async (req, res) => {
    try{
        const asset = await Asset.findById(req.params.id);

        /*if(!asset){
            return res.status(404).json({ message: 'Asset not found' });
        }*/

        const update = await Asset.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(update);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Borrar un asset
const deleteAsset = async (req, res) => {
    try{
        const asset = await Asset.findById(req.params.id);

        /*if(!asset){
            return res.status(404).json({ message: 'Asset not found' });
        }*/
        
        await asset.deleteOne();
        res.status(200).json({message: req.params.id});
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    getAssets,
    getAssetByID,
    updateAsset,
    createAsset,
    deleteAsset,
}


/*const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// Универсальный фильтр + пагинация + сортировка
router.get('/', async (req, res) => {
  try {
    const {
      category,
      subcategory,
      format,
      author,
      name,
      tags,
      dateFrom,
      dateTo,
      order = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (format) filter.format = format;
    if (author) filter.author = author;
    if (name) filter.name = { $regex: name, $options: 'i' }; // нечувствительно к регистру
    if (tags) filter.tags = { $all: tags.split(',') }; // все теги
    if (dateFrom || dateTo) {
      filter.publishedAt = {};
      if (dateFrom) filter.publishedAt.$gte = new Date(dateFrom);
      if (dateTo) filter.publishedAt.$lte = new Date(dateTo);
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const skip = (page - 1) * parseInt(limit);

    const assets = await Asset.find(filter)
      .sort({ publishedAt: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    res.json(assets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


//Глобальный
const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const Format = require('../models/Format');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
  try {
    const q = req.query.q;
    const regex = new RegExp(q, 'i');

    const [assets, formats, categories] = await Promise.all([
      Asset.find({ name: regex }),
      Format.find({ name: regex }),
      Category.find({ name: regex }),
    ]);

    res.json({ assets, formats, categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

*/