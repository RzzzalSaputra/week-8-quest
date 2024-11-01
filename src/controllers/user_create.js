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

module.exports = userController;