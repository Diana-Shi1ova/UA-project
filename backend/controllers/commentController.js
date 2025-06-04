const Comment = require('../models/commentModel');

// Obtener todos los comments
const getComments = async (req, res) => {
    try{
        const comments = await Comment.find();
        res.status(200).json(comments);
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Obtener un comment por ID
const getCommentByID = async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);

        /*if(!comment){
            return res.status(404).json({ message: 'Comment not found' });
        }*/

        res.status(200).json(comment);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// obtener un comment por ID del asset
const getCommentByAsset = async (req, res) => {
        try {
        const assetId = req.params.assetId;
        const comments = await Comment.find({ asset: assetId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// Crear un comment
const createComment = async (req, res) => {
    try{   
        /*if(!req.body){
            return res.status(400).json({ message: 'Missing body' });
        }*/

        const comment = await Comment.create({
            author: req.body.author,
            asset: req.body.asset,
            content: req.body.content,
            likes: req.body.likes
        });
    
        res.status(200).json(comment);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Modificar un comment
const updateComment = async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);

        /*if(!comment){
            return res.status(404).json({ message: 'Comment not found' });
        }*/

        const update = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(update);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Borrar un comment
const deleteComment = async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);

        /*if(!comment){
            return res.status(404).json({ message: 'Comment not found' });
        }*/
        
        await comment.deleteOne();
        res.status(200).json({message: req.params.id});
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    getComments,
    getCommentByID,
    updateComment,
    createComment,
    deleteComment,
    getCommentByAsset,
}