const express = require("express")
const {errorHandling} = require("../middleware/errorHandilng")

const borrowersRoutes = require("./borrowers_routes")
const authorRoutes = require("./author_routes")
const categoryRoutes = require("./category_routes")
const bookRoutes = require("./book_routes")
const borrowRoutes = require("./borrow_routes")

const routes = express.Router()

// kumpulkan semua routes disini per bagian ex : /author,/books dll
routes.use(borrowRoutes)
routes.use(bookRoutes)
routes.use(categoryRoutes)
routes.use(authorRoutes)
routes.use(borrowersRoutes)
routes.use(errorHandling);

module.exports = routes