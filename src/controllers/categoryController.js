const categoryModel = require("../models/category_model");
const { errorMsg, errorName } = require("../utils/errorMiddleware");

const categoryController = {};

categoryController.create = async (req, res, next) => {
    try {
        const { name, description} = req.body;

        // Check required 
        if (!name || !description) {
          throw { name: errorName.BAD_REQUEST, message: errorMsg.EMPETY_INPUT };
        }

        // Create new category
        const category = new categoryModel({
            name,
            description,
            updatedAt: new Date(),
            createdAt: new Date(),
        });

        // Save category
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

categoryController.read = async (req, res, next) => {
    try {

        // Search category if deleteAt = null
        const category = await categoryModel.find({deleteAt: null});

        res.status(200).json(category.map(category =>({
            _id: category._id,
            name: category.name
        })));
    } catch (error) {
        next(error);
    }
};

categoryController.update = async (req, res, next) => {
    try {
        const { updatedAt, ...updateData } = req.body;
        const updatedData = { ...updateData, updatedAt: new Date() };
        
        // Search category by id and deleteAt = null
        const category = await categoryModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, updateData, { new: true });
        // If category not found
        if (!category) {
        throw { name: errorName.NOT_FOUND, message: errorMsg.CATEGORY_NOT_FOUND };
        }

        res.status(200).json(category);
    } catch (error) {
       next(error);
    }
};

categoryController.delete = async (req, res, next) => {
    try {
        // Search category by id and deleteAt = null
        const category = await categoryModel.findOneAndUpdate({ _id: req.params.id, deleteAt: null}, {deleteAt: new Date()}, { new: true });

        // If category not found
        if (!category){
        throw { name: errorName.NOT_FOUND, message: errorMsg.CATEGORY_NOT_FOUND };
        }

        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

categoryController.readDetail = async (req, res, next) => {
    try {
        // Search category if deleteAt = null
        const category = await categoryModel.find({_id: req.params.id, deleteAt: null});
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

module.exports = {categoryController};