const express = require("express")
const { bookController } = require('../controllers/bookController');
const {upload} = require('../middleware/upload')

const bookRoutes = express.Router()

bookRoutes.post("/book", bookController.create)
bookRoutes.get("/book", bookController.read)
bookRoutes.put("/book/:id", bookController.update)
bookRoutes.delete("/book/:id", bookController.delete)
bookRoutes.get("/book/:id", bookController.readDetail)
bookRoutes.post("/book/upload/:id", upload.single('image'), bookController.upload)

module.exports = bookRoutes;