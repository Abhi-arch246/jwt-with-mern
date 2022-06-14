const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        if (conn)
            console.log("Mongodb Successfully connected");
        else
            console.log("Check your connection");
    } catch (error) {
        console.log("Something went wrong");
        process.exit(1)
    }
}

module.exports = connectDb