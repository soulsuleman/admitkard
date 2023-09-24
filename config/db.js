const mongoose = require("mongoose")
require("dotenv").config()

const connection = async () =>{
 try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Connected to MongoDB");
 } catch (error) {
    console.log("Couldn't connect to MongoDB: " + error)
 }
}

module.exports = {connection}