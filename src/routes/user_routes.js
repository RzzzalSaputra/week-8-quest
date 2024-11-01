const express = require("express")
const { userController } = require('../controllers/userController');

const userRoutes = express.Router()

userRoutes.post("/user", userController.create)
userRoutes.get("/user", userController.read)
userRoutes.put("/user/:id", userController.update)
userRoutes.put("/user/soft-delete/:id", userController.delete)

module.exports = userRoutes;