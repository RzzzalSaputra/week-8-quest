const { errorMsg, errorName } = require("../utils/errorMiddleware");
const authorModel = require("../models/author_model");

exports.checkAuthor = async (req, res, next) => {
    try {
        if (!req.body.author) {
            return next();
        }

        // Cek Apakah Buku Ada Di Database
        const checkauthor = await authorModel.findOne({ _id: req.body.author, deleteAt: null });

        // Jika Buku Tidak Ada
        if (!checkauthor) {
            return next({ name: errorName.NOT_FOUND, message: errorMsg.AUTHOR_NOT_FOUND });
        }

        // Jika Buku Ada
        next();
    } catch (error) {
        next(error);
    }
};
