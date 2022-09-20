const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.URL

const startConnection = async() => {
    try {
        await mongoose.connect(url)
        console.log("CONNECTED TO DATABASE")
    } catch (error) {
        console.log(error)
    }
}

module.exports = startConnection