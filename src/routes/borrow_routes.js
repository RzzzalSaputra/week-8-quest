const express = require("express")
const { borrowController } = require('../controllers/borrowController');
const { checkBook } = require("../middleware/checkBook");
const { checkBorrowers } = require("../middleware/checkBorrowers");

const borrowRoutes = express.Router()

borrowRoutes.post("/borrow/book",checkBook, checkBorrowers, borrowController.create)
borrowRoutes.post("/borrow/book/return", borrowController.createBookReturn)
borrowRoutes.get("/borrow/book/list", borrowController.readList)

module.exports = borrowRoutes;