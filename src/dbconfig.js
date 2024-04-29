//configuring the app to connect with the MongoDB Database

const dbname = //your database name
const mongoose = require("mongoose")
const connect = mongoose.connect(`mongodb://localhost:27017/${dbname}`)

//creating a schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//creating a model of users
const collection = new mongoose.model(dbname,userSchema)

//exporting the collection to store user data via index.js
module.exports = collection