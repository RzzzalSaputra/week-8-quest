const { errorMsg, errorName } = require("../utils/errorMiddleware");
const borrowersModel = require("../models/borrowers_model");

exports.checkBorrowers = async (req, res, next) => {
    try {
        if (!req.body.borrowers) {
            return next();
        }

        // Cek Apakah Buku Ada Di Database
        const checkborrowers = await borrowersModel.findOne({ _id: req.body.borrowers, deleteAt: null });

        // Jika Buku Tidak Ada
        if (!checkborrowers) {
            return next({ name: errorName.NOT_FOUND, message: errorMsg.BORROWERS_NOT_FOUND });
        }

        // Jika Buku Ada
        next();
    } catch (error) {
        next(error);
    }
};
