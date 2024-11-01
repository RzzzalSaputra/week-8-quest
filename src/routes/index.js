const express = require("express")
const {errorHandling} = require("../middleware/errorHandilng")

const userRoutes = require("./user_routes")

const routes = express.Router()

// kumpulkan semua routes disini per bagian ex : /author,/books dll
routes.use(userRoutes)
routes.use(errorHandling);

module.exports = routes