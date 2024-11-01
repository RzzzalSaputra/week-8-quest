const userModel = require("../models/user_model");
const { errorMsg, errorName } = require("../utils/errorMiddleware");

const userController = {};

userController.create = async (req, res, next) => {
    try {
        const { userName, password, name, email, phoneNumber, is_Admin } = req.body;

        // Check required 
        if (!userName || !password || !name || !email || !phoneNumber) {
          throw { name: errorName.BAD_REQUEST, message: errorMsg.EMPETY_INPUT };
        }

        // Create new user
        const user = new userModel({
            userName,
            password,
            name,
            email,
            phoneNumber,
            is_Admin: is_Admin || false,
            updatedAt: new Date(),
            createdAt: new Date(),
        });

        // Save user
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

userController.update = async (req, res, next) => {
    try {
        const { updatedAt, ...updateData } = req.body;
        const updatedData = { ...updateData, updatedAt: new Date() };
        
        // Search user by id and deleteAt = null
        const user = await userModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, updateData, { new: true });
        // If user not found
        if (!user) {
        throw { name: errorName.NOT_FOUND, message: errorMsg.USER_NOT_FOUND };
        }

        res.status(200).json(user);
    } catch (error) {
       next(error);
    }
};

userController.delete = async (req, res, next) => {
    try {
        // Search user by id and deleteAt = null
        const user = await userModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, {deleteAt: new Date()}, { new: true });

        // If user not found
        if (!user){
        throw { name: errorName.NOT_FOUND, message: errorMsg.USER_NOT_FOUND };
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

userController.read = async (req, res, next) => {
    try {

        // Search user if deleteAt = null
        const user = await userModel.find({deleteAt: null});

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {userController};