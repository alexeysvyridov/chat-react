const mongoose  = require('mongoose')

const Post = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        img: {
            type:String
        },
        desc: {
            type: String,
            max: 500
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Post", Post);
