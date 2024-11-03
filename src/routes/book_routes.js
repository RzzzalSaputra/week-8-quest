const express = require("express")
const { bookController } = require('../controllers/bookController');
const {upload} = require('../middleware/upload')
const {checkAuthor} = require('../middleware/checkAuthor')
const {checkCategory} = require('../middleware/checkCategory')

const bookRoutes = express.Router()

bookRoutes.post("/book", checkAuthor, checkCategory, bookController.create)
bookRoutes.get("/book", bookController.read)
bookRoutes.put("/book/:id", checkAuthor, checkCategory, bookController.update)
bookRoutes.delete("/book/:id", bookController.delete)
bookRoutes.get("/book/:id", bookController.readDetail)
bookRoutes.post("/book/upload/:id", upload.single('image'), bookController.upload)

module.exports = bookRoutes;