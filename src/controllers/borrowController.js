const borrowModel = require("../models/borrow");
const stockModel = require("../models/stock_model");
const { errorMsg, errorName } = require("../utils/errorMiddleware");

const borrowController = {};

const countfee = (dueAt)=>{
    let one_day = 1000 * 60 * 60 * 24;
    let Difference_In_Days = Math.floor((new Date() - dueAt) / one_day);
    return Math.max(0, 5000 * Difference_In_Days);
}

borrowController.create = async (req, res, next) => {
    try {
        const { borrowers, book} = req.body;

        const stock = await stockModel.findOne({book: book, deleteAt: null});

        if(!stock){
            throw { name: errorName.NOT_FOUND, message: errorMsg.STOCK_NOT_FOUND };
        }

        if(stock.quantity <= 0){
            throw { name: errorName.NOT_FOUND, message: errorMsg.STOCK_NOT_ENOUGH };
        }

        // Check required 
        if (!borrowers || !book) {
          throw { name: errorName.BAD_REQUEST, message: errorMsg.EMPETY_INPUT };
        }

        // Create new borrow
        const borrow = new borrowModel({
            borrowers,
            book
        });

        // Update stock
        stock.quantity -= 1;
        stock.logs.push(`Borrowed on ${new Date().toLocaleDateString()}, Quantity -1`);
        
        // Save borrow and stock
        await stock.save();
        await borrow.save();
        res.status(201).json(borrow);
    } catch (error) {
        next(error);
    }
};

borrowController.readList = async (req, res, next) => {
    try {

        // Search borrow if deleteAt = null
        const borrow = await borrowModel.find({deleteAt: null, returnAt: null})
        .populate('book')
        .populate('borrowers')

        res.status(200).json(borrow.map(borrow => ({
            _id: borrow._id,
            borrowers: borrow.borrowers.borrowersName,
            book: borrow.book.map(book => book.title),
            borrowingTime: borrow.createAt,
            dueAt: borrow.dueAt
        })));
    } catch (error) {
        next(error);
    }
};

borrowController.createBookReturn = async (req, res, next) => {
    try {
        const { borrowers, book} = req.body;
        const borrow = await borrowModel.findOne({borrowers: borrowers,book: book, deleteAt: null })

        const stock = await stockModel.findOne({book: book, deleteAt: null});
        stock.quantity += 1;
        stock.logs.push(`Returned on ${new Date().toLocaleDateString()}, Quantity +1`);

        
        if (!borrow) {
            throw { name: errorName.NOT_FOUND, message: errorMsg.BORROW_NOT_FOUND };
        }
        
        const createAt = borrow.createAt;
        const updatedBorrow = await borrowModel.findOneAndUpdate({ _id: borrow._id },{ returnAt: new Date(),updateAt: new Date(), lateFee: countfee(createAt) },{ new: true });
        
        await stock.save();
        res.status(200).json(borrow);
    } catch (error) {
       next(error);
    }
};
module.exports = {borrowController};