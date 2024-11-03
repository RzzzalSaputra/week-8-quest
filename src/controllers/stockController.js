const stockModel = require("../models/stock_model");
const { errorMsg, errorName } = require("../utils/errorMiddleware");

const stockController = {};

stockController.create = async (req, res, next) => {
    try {
        const { book, quantity } = req.body;

        // Check required 
        if (!book || !quantity) {
          throw { name: errorName.BAD_REQUEST, message: errorMsg.EMPETY_INPUT };
        }
        
        // Create new user
        const user = new stockModel({
            book,
            quantity,
            logs: [`Stock added on ${new Date().toLocaleDateString()}, quantity +${quantity}`]
        });

        
        // Save user
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

stockController.read = async (req, res, next) => {
    try {
        // Search stock if deleteAt = null
        const stock = await stockModel.find({deleteAt: null});
        
        res.status(200).json(stock);
    } catch (error) {
        next(error);
    }
};

stockController.update = async (req, res, next) => {
    try {
        const { book, quantity} = req.body;
        const check = await stockModel.findOne({_id: req.params.id})

        const quantityNew = Number(quantity) - Number(check.quantity);
        let updateLogs = ``;
        if(quantityNew > 0){
             updateLogs = `Stock Edit on ${new Date().toLocaleDateString()}, Current Quantity: ${check.quantity}, New Quantity: +${quantityNew}`
        }else{
            updateLogs = `Stock Edit on ${new Date().toLocaleDateString()}, Current Quantity: ${check.quantity}, New Quantity: ${quantityNew}`
        }

        // Search user by id and deleteAt = null
        const stock = await stockModel.findOneAndUpdate(
            { _id: req.params.id, deleteAt: null}, 
            {book: book, quantity: quantity, $push:{logs: updateLogs}  ,updatedAt: new Date()}, 
            { new: true }
        );

        // If user not found
        if (!stock) {
        throw { name: errorName.NOT_FOUND, message: errorMsg.STOCK_NOT_FOUND};
        }

        res.status(200).json(stock);
    } catch (error) {
       next(error);
    }
};

stockController.delete = async (req, res, next) => {
    try {
        
        // Search stock by id and deleteAt = null
        const stock = await stockModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, {deleteAt: new Date()}, { new: true });

        // If stock not found
        if (!stock){
        throw { name: errorName.NOT_FOUND, message: errorMsg.STOCK_NOT_FOUND };
        }

        res.status(200).json(stock);
    } catch (error) {
        next(error);
    }
};

stockController.readDetail = async (req, res, next) => {
    try {
        // Search stock if deleteAt = null
        const stock = await stockModel.find({_id: req.params.id, deleteAt: null}).populate('author','name').populate('category', 'name');
        res.status(200).json(stock);
    } catch (error) {
        next(error);
    }
};

stockController.upload = async (req, res, next) => {
    try {
        
        // Search user by id and deleteAt = null
        const stock = await stockModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null},{image: req.file.filename, updateAt: new Date()} , { new: true });

        // If user not found
        if (!stock) {
        throw { name: errorName.NOT_FOUND, message: errorMsg.STOCK_NOT_FOUND};
        }
        
        res.status(200).json(stock);
    } catch (error) {
       next(error);
    }
};


module.exports = {stockController};