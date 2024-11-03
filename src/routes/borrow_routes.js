const express = require("express")
const { borrowController } = require('../controllers/borrowController');

const borrowRoutes = express.Router()

borrowRoutes.post("/borrow/book", borrowController.create)
borrowRoutes.post("/borrow/book/return", borrowController.createBookReturn)
borrowRoutes.get("/borrow/book/list", borrowController.readList)

module.exports = borrowRoutes;