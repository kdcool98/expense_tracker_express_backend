const mongoose = require('mongoose');

const db = async () => { 
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.mongo_url)
        console.log("Mongo Connection successfull")
    } catch (error) {
        console.error("Error during initialization of mongooose", error);
    }
}

module.exports = {db}