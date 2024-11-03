const { errorMsg, errorName } = require("../utils/errorMiddleware");
const bookModel = require("../models/book_model");

exports.checkBook = async (req, res, next) => {
    try {
        if (!req.body.book) {
            return next();
        }

        // Cek Apakah Buku Ada Di Database
        const checkBook = await bookModel.findOne({ _id: req.body.book, deleteAt: null });

        // Jika Buku Tidak Ada
        if (!checkBook) {
            return next({ name: errorName.NOT_FOUND, message: errorMsg.BOOK_NOT_FOUND });
        }

        // Jika Buku Ada
        next();
    } catch (error) {
        next(error);
    }
};
