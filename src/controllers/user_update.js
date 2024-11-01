const userModel = require("../models/user_model");
const { errorMsg, errorName } = require("../utils/errorMiddleware");

const userController = {};

userController.put = async (req, res, next) => {
    try {
        // Search user by id and deleteAt = null
        const user = await userModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, req.body, { new: true });

        // If user not found
        if (!user) {
        throw { name: errorName.NOT_FOUND, message: errorMsg.USER_NOT_FOUND };
        }

        res.status(200).json(user);
    } catch (error) {
       next(error);
    }
};

module.exports = userController;