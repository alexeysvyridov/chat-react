const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    desc:  String,
    isAdmin: Boolean,
    password: {
        type:String,
        required: true
    },
    img: String

})

module.exports = mongoose.model("User", User);