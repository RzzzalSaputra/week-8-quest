const express = require("express")
const { stockController } = require('../controllers/stockController');
const {checkBook} = require('../middleware/checkBook')

const stockRoutes = express.Router()

stockRoutes.post("/stock", stockController.create)
stockRoutes.get("/stock", stockController.read)
stockRoutes.put("/stock/:id",checkBook, stockController.update)
stockRoutes.delete("/stock/:id",stockController.delete)

module.exports = stockRoutes;