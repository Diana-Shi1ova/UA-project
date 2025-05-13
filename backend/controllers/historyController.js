const History = require('../models/historyModel');

// Obtener todos los histtories
const getHistories = async (req, res) => {
    try{
        const histtories = await History.find();
        res.status(200).json(histtories);
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Obtener un history por ID
const getHistoryByID = async (req, res) => {
    try{
        const history = await History.findById(req.params.id);

        /*if(!history){
            return res.status(404).json({ message: 'History not found' });
        }*/

        res.status(200).json(history);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Crear un history
const createHistory = async (req, res) => {
    try{   
        /*if(!req.body){
            return res.status(400).json({ message: 'Missing body' });
        }*/

        const history = await History.create({
            author: req.body.author,
            asset: req.body.asset
        });
    
        res.status(200).json(history);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Modificar un history
const updateHistory = async (req, res) => {
    try{
        const history = await History.findById(req.params.id);

        /*if(!history){
            return res.status(404).json({ message: 'History not found' });
        }*/

        const update = await History.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(update);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Borrar un history
const deleteHistory = async (req, res) => {
    try{
        const history = await History.findById(req.params.id);

        /*if(!history){
            return res.status(404).json({ message: 'History not found' });
        }*/
        
        await history.deleteOne();
        res.status(200).json({message: req.params.id});
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    getHistories,
    getHistoryByID,
    updateHistory,
    createHistory,
    deleteHistory,
}