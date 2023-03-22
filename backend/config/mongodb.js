const mongoose = require('mongoose')

require('dotenv').config()

const connectMongo = async () => {
    try {
        const uri = process.env.MONGO_DB
        // mongoose.connect(uri, {useNewUrlParser: true})
        mongoose
            .connect(uri)

        const conn = mongoose.connection;
        conn.once('open', () => {
            console.log("MongoDB connection established successfully")
        })
    }
    catch (error) {
        console.log("MongoDB connection cannot be established")
        console.log(error)
    }
}

module.exports = connectMongo