const express = require('express')
const routes = require('./routes')
const connectDB = require('./config/mongodb')
const app = express()
const cors = require('cors')

require('dotenv').config({ path: './src/.env' });

const port = process.env.PORT

connectDB()

app.use(cors())
app.use(express.static('/public/upload'))
app.use(express.json());

app.use("/api/v1",routes)


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})