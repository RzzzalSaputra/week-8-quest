const express = require("express")
const { borrowersController } = require('../controllers/borrowersController');

const borrowersRoutes = express.Router()

borrowersRoutes.post("/borrowers", borrowersController.create)
borrowersRoutes.get("/borrowers", borrowersController.read)
borrowersRoutes.put("/borrowers/:id", borrowersController.update)
borrowersRoutes.delete("/borrowers/:id", borrowersController.delete)

module.exports = borrowersRoutes;