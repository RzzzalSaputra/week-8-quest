const express = require("express")
const { categoryController } = require('../controllers/categoryController');

const categoryRoutes = express.Router()

categoryRoutes.post("/category", categoryController.create)
categoryRoutes.get("/category", categoryController.read)
categoryRoutes.put("/category/:id", categoryController.update)
categoryRoutes.delete("/category/:id", categoryController.delete)
categoryRoutes.get("/category/:id", categoryController.readDetail)

module.exports = categoryRoutes;