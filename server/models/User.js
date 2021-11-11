const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: {
        type: String,
        default: null,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    email: {
        type:String,
        unique: true
    },
    img: {
        type: String,
    },
    token: {
        type: String
    }
},
)

module.exports = mongoose.model("User", User);