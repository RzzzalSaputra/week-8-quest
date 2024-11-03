const bookModel = require("../models/book_model");
const { errorMsg, errorName } = require("../utils/errorMiddleware");

const bookController = {};

bookController.create = async (req, res, next) => {
    try {
        const { title, image, author, category, publishedYear } = req.body;

        // Check required 
        if (!title || !publishedYear) {
          throw { name: errorName.BAD_REQUEST, message: errorMsg.EMPETY_INPUT };
        }
        
        // Create new user
        const user = new bookModel({
            title,
            image,
            author,
            category,
            publishedYear,
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

bookController.read = async (req, res, next) => {
    try {
        // Search book if deleteAt = null
        const book = await bookModel.find({deleteAt: null});
        
        res.status(200).json(book.map(book => ({
            _id: book._id,
            title: book.title
        })));
    } catch (error) {
        next(error);
    }
};

bookController.update = async (req, res, next) => {
    try {
        const { updatedAt, ...updateData } = req.body;
        const updatedData = { ...updateData, updatedAt: new Date() };
        
        // Search user by id and deleteAt = null
        const book = await bookModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, updateData, { new: true });

        // If user not found
        if (!book) {
        throw { name: errorName.NOT_FOUND, message: errorMsg.book_NOT_FOUND};
        }

        res.status(200).json(book);
    } catch (error) {
       next(error);
    }
};

bookController.delete = async (req, res, next) => {
    try {
        
        // Search book by id and deleteAt = null
        const book = await bookModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, {deleteAt: new Date()}, { new: true });

        // If book not found
        if (!book){
        throw { name: errorName.NOT_FOUND, message: errorMsg.BOOK_NOT_FOUND };
        }

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

bookController.readDetail = async (req, res, next) => {
    try {
        // Search book if deleteAt = null
        const book = await bookModel.find({_id: req.params.id, deleteAt: null}).populate('author','name').populate('category', 'name');
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

bookController.upload = async (req, res, next) => {
    try {
        
        // Search user by id and deleteAt = null
        const book = await bookModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null},{image: req.file.filename, updateAt: new Date()} , { new: true });

        // If user not found
        if (!book) {
        throw { name: errorName.NOT_FOUND, message: errorMsg.BOOK_NOT_FOUND};
        }
        
        res.status(200).json(book);
    } catch (error) {
       next(error);
    }
};


module.exports = {bookController};