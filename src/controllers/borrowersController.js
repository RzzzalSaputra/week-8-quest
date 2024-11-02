const borrowersModel = require("../models/borrowers_model");
const { errorMsg, errorName } = require("../utils/errorMiddleware");

const borrowersController = {};

borrowersController.create = async (req, res, next) => {
    try {
        const { borrowersName, password, name, email, phoneNumber} = req.body;

        // Check required 
        if (!borrowersName || !password || !name || !email || !phoneNumber) {
          throw { name: errorName.BAD_REQUEST, message: errorMsg.EMPETY_INPUT };
        }

        // Create new borrowers
        const borrowers = new borrowersModel({
            borrowersName,
            password,
            name,
            email,
            phoneNumber,
            updatedAt: new Date(),
            createdAt: new Date(),
        });

        // Save borrowers
        await borrowers.save();
        res.status(201).json(borrowers);
    } catch (error) {
        next(error);
    }
};

borrowersController.update = async (req, res, next) => {
    try {
        const { updatedAt, ...updateData } = req.body;
        const updatedData = { ...updateData, updatedAt: new Date() };
        
        // Search borrowers by id and deleteAt = null
        const borrowers = await borrowersModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, updateData, { new: true });
        // If borrowers not found
        if (!borrowers) {
        throw { name: errorName.NOT_FOUND, message: errorMsg.BORROWERS_NOT_FOUND };
        }

        res.status(200).json(borrowers);
    } catch (error) {
       next(error);
    }
};

borrowersController.delete = async (req, res, next) => {
    try {
        // Search borrowers by id and deleteAt = null
        const borrowers = await borrowersModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, {deleteAt: new Date()}, { new: true });

        // If borrowers not found
        if (!borrowers){
        throw { name: errorName.NOT_FOUND, message: errorMsg.BORROWERS_NOT_FOUND };
        }

        res.status(200).json(borrowers);
    } catch (error) {
        next(error);
    }
};

borrowersController.read = async (req, res, next) => {
    try {

        // Search borrowers if deleteAt = null
        const borrowers = await borrowersModel.find({deleteAt: null});

        res.status(200).json(borrowers);
    } catch (error) {
        next(error);
    }
};

module.exports = {borrowersController};