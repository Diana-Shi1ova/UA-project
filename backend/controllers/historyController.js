const History = require('../models/historyModel');
const Asset = require('../models/assetModel');
const mongoose = require('mongoose');

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
        if(!req.body){
            return res.status(400).json({ message: 'Missing body' });
        }

        const { user, asset } = req.body;

        // Comprobamos si existe la pareja
        const existing = await History.findOne({ user, asset });

        if (existing) return res.status(200).json(existing);
        
        /*const history = await History.create({
            author: req.body.author,
            asset: req.body.asset
        });*/

        const history = await History.create({ user, asset });
        res.status(201).json(history);
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

// Agrupar por día para un usuario concreto
const getUserAssetsGroupedByDay = async (req, res) => {
    try {
        const { user, dateFrom, dateTo } = req.query;

        if (!user) {
            return res.status(400).json({ error: 'user is required' });
        }

        // const match = { user };
        const match = {
            user: new mongoose.Types.ObjectId(user)
        };

        if (dateFrom || dateTo) {
            match.date = {};
            if (dateFrom) match.date.$gte = new Date(dateFrom);
            if (dateTo) match.date.$lte = new Date(dateTo);
        }

        const pipeline = [
            { $match: match },
            {
                $lookup: {
                    from: 'assets',
                    localField: 'asset',
                    foreignField: '_id',
                    as: 'asset'
                }
            },
            { $unwind: '$asset' },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    },
                    assets: { $push: "$asset" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": -1,
                    "_id.month": -1,
                    "_id.day": -1
                }
            }
        ];

        const results = await History.aggregate(pipeline);

        res.json({ groupedByDay: results });

    } catch (err) {
        console.error('Error in getUserAssetsGroupedByDay:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    getHistories,
    getHistoryByID,
    updateHistory,
    createHistory,
    deleteHistory,
    getUserAssetsGroupedByDay,
}