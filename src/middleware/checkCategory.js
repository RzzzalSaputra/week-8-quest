const { errorMsg, errorName } = require("../utils/errorMiddleware");
const categoryModel = require("../models/category_model");

exports.checkCategory = async (req, res, next) => {
    try {
        if (!req.body.category) {
            return next();
        }

        // Cek Apakah Buku Ada Di Database
        const checkcategory = await categoryModel.findOne({ _id: req.body.category, deleteAt: null });

        // Jika Buku Tidak Ada
        if (!checkcategory) {
            return next({ name: errorName.NOT_FOUND, message: errorMsg.CATEGORY_NOT_FOUND });
        }

        // Jika Buku Ada
        next();
    } catch (error) {
        next(error);
    }
};
