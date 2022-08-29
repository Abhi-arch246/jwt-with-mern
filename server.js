const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const connectDb = require('./config/db')
const app = express()

connectDb();
app.use(express.json())
app.use('/api/auth/', authRoute)
app.use('/api/user/', userRoute)


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    })
}


app.listen(port, () => console.log(`Server running on ${port}`))