const Asset = require('../models/assetModel');
const User = require('../models/userModel');
const Format = require('../models/formatModel');
const { uploadFile, deleteFile } = require('../supabase/supabaseService');
const archiver = require('archiver');
const fetch = require('node-fetch');
const mime = require('mime-types');
const mongoose = require('mongoose');

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

const getAssetsByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'Waiting for array of ids' });
    }

    const objectIds = ids.map(id => new mongoose.Types.ObjectId(id));

    const assets = await Asset.find({ _id: { $in: objectIds } });

    res.json(assets);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Obtener por id de usuario
const getAssetsByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const assets = await Asset.find({ author: id });
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Filtrado de assets
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

        console.log(req.query);
        
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
                console.log(req.query.categories)
                const arr = Array.isArray(categories) ? categories : categories.split(',');
                // query['downloadUrls.category'] = { $in: arr };
                query.downloadUrls = { $elemMatch: { category: { $in: arr } } };
            }

            // por etiquetas
            if (tags) {
                const arr = Array.isArray(tags) ? tags : tags.split(',');
                // query.tags = { $all: arr };
                query.tags = { $in: arr.map(n => new RegExp(`^${n}$`, 'i')) };
            }

            // por formatos
            /*if (formats) {
                const arr = Array.isArray(formats) ? formats : formats.split(',');
                // query['downloadUrls.format'] = { $in: arr };
                query.downloadUrls = { $elemMatch: { format: { $in: arr } } };
            }*/
            if (formats) {
                const arr = Array.isArray(formats) ? formats : formats.split(',');

                // Comprobamos si hay 'Otro'
                const hasOtro = arr.includes("Otro");

                if (hasOtro) {
                    // Eliminamos 'Otro'
                    const realFormats = arr.filter(f => f !== "Otro");

                    // Obtenemos todos los formatos
                    const allFormats = await Format.find({}, 'extention').lean();
                    const knownFormats = allFormats.map(f => f.extention);

                    // Creamos condición
                    //   uno de realFormats
                    //   o formato que no está
                    query.downloadUrls = {
                        $elemMatch: {
                            $or: [
                                { format: { $in: realFormats } },
                                { format: { $nin: knownFormats } }
                            ]
                        }
                    };
                } else {
                    // Filtro normal por formatos
                    query.downloadUrls = { $elemMatch: { format: { $in: arr } } };
                }
            }

            // por autores
            if (authors) {
                /*const arr = Array.isArray(authors) ? authors : authors.split(',');
                query.author = { $in: arr };*/
                const names = Array.isArray(authors) ? authors : authors.split(',');

                const matchedUsers = await User.find({
                    // username: { $in: names }
                    name: { $in: names.map(n => new RegExp(`^${n}$`, 'i')) }
                }, '_id');

                console.log('matched users:', matchedUsers);

                const ids = matchedUsers.map(user => user._id);

                query.author = { $in: ids };
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
                .limit(parseInt(limit)),
                // .populate('author', 'username'),
            Asset.countDocuments(query),
        ]);

        // Obtener nombres de los autores
        /*const authorUsernames = [
            ...new Set(
                results
                .map(asset => asset.author?.username)
                .filter(Boolean) // excluir undefined
            )
        ];*/

        // Encontrar ids de usuarios sin duplicados
        const authorIds = [
        ...new Set(results.map(asset => asset.author?.toString()).filter(Boolean))
        ];

        // Encontrar usuarios
        const users = await User.find({ _id: { $in: authorIds } }, 'name');

        // Crear array de nombres de usuarios
        const authorUsernames = users.map(user => user.name);

        res.json({
            results,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            authors: authorUsernames
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

        if(!asset){
            return res.status(404).json({ message: 'Asset not found' });
        }

        const update = await Asset.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            // categories: req.body.categories,
            tags: req.body.tags,
            // downloadUrls: req.body.downloadUrls,
            // previews: req.body.previews,
            //author: req.body.author,
            //likes: 0,
        },  {new: true});
       

        //const update = await Asset.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(req.files && req.files.length > 0){
            const newReq = {
                ...req,
                params: { ...(req.params || {}), id: asset.id },
                body: req.body,
                files: req.files,
            };

            await uploadFiles(newReq);
        }

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

        /*const updatedAsset = await Asset.findByIdAndUpdate(
            assetId,
            { downloadUrls: uploadedFiles },
            { new: true }
        );*/

        const updatedAsset = await Asset.findByIdAndUpdate(
            assetId,
            {
                $push: {
                    downloadUrls: { $each: uploadedFiles }
                }
            },
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


const downloadAsset = async (req, res) => {
  const { user, asset } = req.params;
  const { filenames } = req.body;

  if (!Array.isArray(filenames) || filenames.length === 0) {
    return res.status(400).send('No filenames provided');
  }

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
    getAssetsByIds,
    getAssetsByUserId,
}