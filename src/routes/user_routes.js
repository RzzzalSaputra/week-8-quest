const express = require("express")

const userCreate = require("../controllers/user_create")
const userRead = require("../controllers/user_read")
const userUpdate = require("../controllers/user_update")
const userDelete = require("../controllers/user_delete")

const userRoutes = express.Router()

userRoutes.post("/user", userCreate.create)
userRoutes.get("/user", userRead.read)
userRoutes.put("/user/:id", userUpdate.put)
userRoutes.put("/user/soft-delete/:id", userDelete.put)


module.exports = userRoutes;