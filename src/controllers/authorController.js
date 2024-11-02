const authorModel = require("../models/author_model");
const { errorMsg, errorName } = require("../utils/errorMiddleware");

const authorController = {};

authorController.create = async (req, res, next) => {
    try {
        const { name,bio, image, debut } = req.body;

        // Check required 
        if (!name) {
          throw { name: errorName.BAD_REQUEST, message: errorMsg.EMPETY_INPUT };
        }
        
        // Create new user
        const user = new authorModel({
            name,
            bio,
            image,
            debut,
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
authorController.read = async (req, res, next) => {
    try {
        // Search author if deleteAt = null
        const author = await authorModel.find({deleteAt: null});
        console.log(author)
        res.status(200).json(author.map(author => ({
            _id: author._id,
            name: author.name
        })));
    } catch (error) {
        next(error);
    }
};

authorController.update = async (req, res, next) => {
    try {
        const { updatedAt, ...updateData } = req.body;
        const updatedData = { ...updateData, updatedAt: new Date() };
        
        // Search user by id and deleteAt = null
        const author = await authorModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, updateData, { new: true });

        // If user not found
        if (!author) {
        throw { name: errorName.NOT_FOUND, message: errorMsg.AUTHOR_NOT_FOUND};
        }

        res.status(200).json(author);
    } catch (error) {
       next(error);
    }
};

authorController.delete = async (req, res, next) => {
    try {
        // Search author by id and deleteAt = null
        const author = await authorModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, {deleteAt: new Date()}, { new: true });

        // If author not found
        if (!author){
        throw { name: errorName.NOT_FOUND, message: errorMsg.AUTHOR_NOT_FOUND };
        }

        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};

authorController.readDetail = async (req, res, next) => {
    try {
        // Search author if deleteAt = null
        const author = await authorModel.find({_id: req.params.id, deleteAt: null});
        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};

authorController.upload = async (req, res, next) => {
    try {
        
        // Search user by id and deleteAt = null
        const author = await authorModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null},{image: req.file.filename, updateAt: new Date()} , { new: true });

        // If user not found
        if (!author) {
        throw { name: errorName.NOT_FOUND, message: errorMsg.AUTHOR_NOT_FOUND};
        }
        
        res.status(200).json(author);
    } catch (error) {
       next(error);
    }
};


module.exports = {authorController};