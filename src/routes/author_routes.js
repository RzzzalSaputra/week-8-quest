const express = require("express")
const { authorController } = require('../controllers/authorController');
const {upload} = require('../middleware/upload')

const authorRoutes = express.Router()

authorRoutes.post("/author", authorController.create)
authorRoutes.get("/author", authorController.read)
authorRoutes.put("/author/:id", authorController.update)
authorRoutes.delete("/author/:id", authorController.delete)
authorRoutes.get("/author/:id", authorController.readDetail)
authorRoutes.post("/author/upload/:id", upload.single('image'), authorController.upload)

module.exports = authorRoutes;