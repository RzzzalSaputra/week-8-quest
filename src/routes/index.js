const express = require("express")
const {errorHandling} = require("../middleware/errorHandilng")

const routes = express.Router()
const borrowersRoutes = require("./borrowers_routes")
const authorRoutes = require("./author_routes")
const categoryRoutes = require("./category_routes")
const bookRoutes = require("./book_routes")
const borrowRoutes = require("./borrow_routes")

// kumpulkan semua routes disini per bagian ex : /author,/books dll
routes.use(borrowRoutes)
routes.use(bookRoutes)
routes.use(categoryRoutes)
routes.use(authorRoutes)
routes.use(borrowersRoutes)
routes.use(errorHandling);

routes.all('*', (req,res)=>{
    res.status(404).send('Page not found')
})

module.exports = routes