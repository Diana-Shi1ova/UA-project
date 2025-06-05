const Asset = require('../models/assetModel');
const { uploadFile, deleteFile } = require('../supabase/supabaseService');
const archiver = require('archiver');
const fetch = require('node-fetch');
const mime = require('mime-types');

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

        if(!asset){
            return res.status(404).json({ message: 'Asset not found' });
        }

        res.status(200).json(asset);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const searchAssets = async (req, res) => {
    try {
        const {
            q,
            name,
            categories,
            formats,
            tags,
            authors,
            dateFrom,
            dateTo,
            sortBy = 'newest',
            page = 1,
            limit = 20,
        } = req.query;

        const query = {};

        // búsqueda universal
        if (q) {
            const regex = new RegExp(q.trim(), 'i');
            query.$or = [
                { name: regex },
                { tags: { $elemMatch: { $regex: regex } } },
                { downloadUrls: { $elemMatch: { category: { $regex: regex } } } },
            ];
        } else {
            // sólo si NO hay q
            if (name) {
                query.name = { $regex: name, $options: 'i' };
            }

            // por categorías
            if (categories) {
                const arr = Array.isArray(categories) ? categories : categories.split(',');
                query['downloadUrls.category'] = { $in: arr };
            }

            // por etiquetas
            if (tags) {
                const arr = Array.isArray(tags) ? tags : tags.split(',');
                query.tags = { $all: arr };
            }

            // por formatos
            if (formats) {
                const arr = Array.isArray(formats) ? formats : formats.split(',');
                query['downloadUrls.format'] = { $in: arr };
            }

            // por autores
            if (authors) {
                const arr = Array.isArray(authors) ? authors : authors.split(',');
                query.author = { $in: arr };
            }

            // por rango de fechas
            if (dateFrom || dateTo) {
                query.createdAt = {};
                if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
                if (dateTo) query.createdAt.$lte = new Date(dateTo);
            }
        }

        // ordenar
        const sortOption = sortBy === 'likes' ? { likes: -1 } : { createdAt: -1 };

        // paginación
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [results, total] = await Promise.all([
            Asset.find(query)
                .sort(sortOption)
                .skip(skip)
                .limit(parseInt(limit))
                .populate('author', 'username'),
            Asset.countDocuments(query),
        ]);

        res.json({
            results,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
        });
    } catch (err) {
        console.error('Asset filter error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};


// Crear un asset
const createAsset = async (req, res) => {
    // console.log("Cuerpo", req.body);
    // console.log("Files", req.files);
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
            // categories: req.body.categories,
            tags: req.body.tags,
            // downloadUrls: req.body.downloadUrls,
            // previews: req.body.previews,
            author: req.body.author,
            likes: 0,
        });

        const newReq = {
            ...req,
            params: { ...(req.params || {}), id: asset.id },
            body: req.body,
            files: req.files,
        };

        await uploadFiles(newReq);
    
        res.status(200).json(asset);
    } catch(error){
        console.error('UPLOAD ERROR:', error);
        console.error('STACK TRACE:', error.stack);
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

// Subir ficheros del asset a Supabase
/*const uploadFiles = async (req, res) => {
    try {
        const userId = req.body.user;
        const assetId = req.body.asset;
        const filename = req.body.filename;

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileBuffer = req.file.buffer;
        // const fileName = `avatars/${userId}/${req.file.originalname}`;
        const fileName = `assets/${userId}/${assetId}/${filename}`;
        const mimeType = req.file.mimetype;

        // Subir a Supabase
        const publicUrl = await uploadFile(fileBuffer, fileName, mimeType);
        console.log(publicUrl);

        // Actualizar MongoDB
        const updatedAsset = await Asset.findByIdAndUpdate(
            assetId,
            { url: publicUrl },
            { new: true }
        );

        res.status(200).json(updatedAsset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Upload error', error: error.message });
    }
};*/

const uploadFiles = async (req) => {
    try {
        const userId = req.body.author;
        const assetId = req.params.id;
        // const formats = JSON.parse(req.body.formats);
        // const categories = JSON.parse(req.body.categories);
        const raw = req.body.categories;
        let categories = Array.isArray(raw)
            ? raw.map(item => JSON.parse(item))
            : [JSON.parse(raw)];

        console.log(categories);

        if (!req.files || req.files.length === 0) {
            // return res.status(400).json({ message: 'No files uploaded' });
            throw new Error('No files uploaded');
        }

        /*const uploadedFiles = [];

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const fileBuffer = file.buffer;
            const fileName = `assets/${userId}/${assetId}/${file.originalname}`;
            const mimeType = file.mimetype;

            const publicUrl = await uploadFile(fileBuffer, fileName, mimeType);

            uploadedFiles.push({
                url: publicUrl,
                size: file.size,
                filename: file.originalname,
                format: formats[i],
                category: categories[i]
            });
        }*/

        const uploadPromises = req.files.map((file, i) => {
            const fileBuffer = file.buffer;
            const fileName = `assets/${userId}/${assetId}/${file.originalname}`;
            const mimeType = file.mimetype;

            const foundFile = categories.find(item => item.file === file.originalname);

            return uploadFile(fileBuffer, fileName, mimeType)
                .then(publicUrl => ({
                    url: publicUrl,
                    size: file.size,
                    filename: file.originalname,
                    format: file.originalname.split('.').pop().toLowerCase(),
                    category: foundFile.category
                }));
        });

        const uploadedFiles = await Promise.all(uploadPromises);

        const updatedAsset = await Asset.findByIdAndUpdate(
            assetId,
            { downloadUrls: uploadedFiles },
            { new: true }
        );

        /*const updatedAsset = await Asset.findByIdAndUpdate(
            assetId,
            { $push: { files: { $each: uploadedFiles } } },
            { new: true }
        );*/

        // res.status(200).json({ uploadedFiles, asset: updatedAsset });
        return uploadedFiles;
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Upload error', error: error.message });
    }
};


// Borrar ficheros del asset de Supabase
/*const deleteFiles = async (req, res) => {
    try {
        const assetId = req.params.id;

        // Buscar asset
        const asset = await Asset.findById(assetId);
        if (!asset || !asset.downloadUrls || asset.downloadUrls.length === 0) {
            return res.status(404).json({ message: 'Asset or files not found' });
        }

        // Obtener  path
        const bucketPath = '/storage/v1/object/public/molamazogames/';
        // const filePath = asset.downloadUrls.url.split(bucketPath)[1];
        // for (const fileObj of asset.downloadUrls) {
        //     if (!fileObj.url) continue;

        //     const filePath = fileObj.url.split(bucketPath)[1];
        //     if (!filePath) {
        //         console.warn(`Invalid file URL: ${fileObj.url}`);
        //         continue;
        //     }

        //     // Eliminar de Supabase
        //     await deleteFile(filePath);
        // }

        await Promise.all(asset.downloadUrls.map(async (fileObj) => {
            if (!fileObj.url) return;
                const filePath = fileObj.url.split(bucketPath)[1];
            if (!filePath) {
                console.warn(`Invalid file URL: ${fileObj.url}`);
                return;
            }
            try {
                await deleteFile(filePath);
            } catch (err) {
                console.error(`Error deleting file ${filePath}:`, err);
            }
        }));

        // Actualizamos asset
        asset.downloadUrls = [];
        await asset.save();

        res.status(200).json({ message: 'Fileы deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Delete error', error: error.message });
    }
};*/


const deleteFiles = async (req, res) => {
    try {
        const assetId = req.params.id;
        const filesToDelete = req.body.files;

        const asset = await Asset.findById(assetId);
        if (!asset || !asset.downloadUrls || asset.downloadUrls.length === 0) {
            return res.status(404).json({ message: 'Asset or files not found' });
        }

        const bucketPath = '/storage/v1/object/public/molamazogames/';

        let filesForDeletion;

        // Filtrado de url de ficheros a eliminar
        if (Array.isArray(filesToDelete) && filesToDelete.length > 0) {
            filesForDeletion = asset.downloadUrls.filter(fileObj =>
                filesToDelete.includes(fileObj.url) || filesToDelete.includes(fileObj.filename)
            );
        } else {
            filesForDeletion = asset.downloadUrls;
        }

        // Borramos de Supabase
        await Promise.all(filesForDeletion.map(async (fileObj) => {
            if (!fileObj.url) return;
            const filePath = fileObj.url.split(bucketPath)[1];
            if (!filePath) {
                console.warn(`Invalid file URL: ${fileObj.url}`);
                return;
            }
            try {
                await deleteFile(filePath);
            } catch (err) {
                console.error(`Error deleting file ${filePath}:`, err);
            }
        }));

        // Actualizamos asset
        if (Array.isArray(filesToDelete) && filesToDelete.length > 0) {
            asset.downloadUrls = asset.downloadUrls.filter(fileObj =>
                !(filesToDelete.includes(fileObj.url) || filesToDelete.includes(fileObj.filename))
            );
        } else {
            asset.downloadUrls = [];
        }

        await asset.save();

        res.status(200).json({ message: 'Files deleted', remainingFiles: asset.downloadUrls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Delete error', error: error.message });
    }
};

// Descargar asset
/*const downloadAsset = async (req, res) => {
    const { user, asset, filename } = req.params;
    const fileUrl = `https://ovlqvvbzyqzscmsrxcsj.supabase.co/storage/v1/object/public/molamazogames/assets/${user}/${asset}/${filename}`;

    try {
        const response = await fetch(fileUrl);

        if (!response.ok) {
            return res.status(404).send('File not found');
        }

        const buffer = await response.arrayBuffer();
        const mimeType = response.headers.get('content-type') || 'application/octet-stream';

        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', mimeType);
        res.send(Buffer.from(buffer));
    } catch (err) {
        console.error(err);
        res.status(500).send('Download failed');
    }
}*/

const downloadAsset = async (req, res) => {
  const { user, asset } = req.params;
  const { filenames } = req.body;

  if (!Array.isArray(filenames) || filenames.length === 0) {
    return res.status(400).send('No filenames provided');
  }

  // Un fichero - sin zip
  /*if (filenames.length === 1) {
    const filename = filenames[0];
    const fileUrl = `https://ovlqvvbzyqzscmsrxcsj.supabase.co/storage/v1/object/public/molamazogames/assets/${user}/${asset}/${filename}`;
    
    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        return res.status(404).send('File not found');
      }

      const buffer = await response.buffer();
      //const mimeType = response.headers.get('content-type') || 'application/octet-stream';
      //res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      //res.setHeader('Content-Type', mimeType);
      //res.setHeader('Content-Disposition', `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`);
      
      //res.setHeader(
      //  'Content-Disposition',
      //  `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`
      //);
      //res.setHeader('Content-Type', 'application/octet-stream');


      //res.attachment(filename);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      const mimeType = mime.lookup(filename) || 'application/octet-stream';
      res.setHeader('Content-Type', mimeType);
      return res.send(buffer);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Download failed');
    }
  }*/

  // Varios ficheros - zip
  res.setHeader('Content-Disposition', "attachment; filename*=UTF-8''assets.zip");
  res.setHeader('Content-Type', 'application/zip');

  const archive = archiver('zip');
  archive.pipe(res);

  try {
    const downloads = filenames.map(async (filename) => {
      const fileUrl = `https://ovlqvvbzyqzscmsrxcsj.supabase.co/storage/v1/object/public/molamazogames/assets/${user}/${asset}/${filename}`;
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error(`File not found: ${filename}`);
      }

      const buffer = await response.buffer();
      archive.append(buffer, { name: filename });
    });

    await Promise.all(downloads);
    await archive.finalize();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error downloading or zipping files');
  }
};


module.exports = {
    getAssets,
    getAssetByID,
    updateAsset,
    createAsset,
    deleteAsset,
    uploadFiles,
    deleteFiles,
    downloadAsset,
    searchAssets,
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