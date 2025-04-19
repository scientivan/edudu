const mongoose = require('mongoose')

const contentModel = mongoose.model('contents', new mongoose.Schema(
    {

        title : {
            type : String,
            required : true
        },
        desc: {
            type : String,
            required : true,
        },
        imagesLink : {
            type : String,
            required : true
        },
        captions : {
            type : [String],
            required : true,
        },
        watchCount : {
            type : Number,
            required : true,
            default : 0
        },
        likeCount : {
            type : Number,
            required : true,
            default : 0
        },
        isPaid : {
            type : Boolean,
            default : false,
            required : true,
        }
    },
    {
        timestamps: true // Menambahkan createdAt & updatedAt
    }
)
)

module.exports = {contentModel}