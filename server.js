const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const userRoute = require('./routes/userRoute')
const connectDb = require('./config/db')
const app = express()

connectDb();
app.use(express.json())
app.use('/api/users/', userRoute)


app.listen(port, () => console.log(`Server running on ${port}`))