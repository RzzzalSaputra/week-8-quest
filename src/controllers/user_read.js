const userModel = require("../models/user_model");

const userController = {};

userController.read = async (req, res, next) => {
    try {

        // Search user if deleteAt = null
        const user = await userModel.find({deleteAt: null});

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = userController;