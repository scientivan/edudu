const mongoose = require('mongoose')
const userModel = mongoose.model(
    'users',
    new mongoose.Schema(
        {
            
            address: {
                type: String,
                required: false
            },
            chainId: {
                type: String,
                required: true
            },
            networkName: {
                type: String,
                required: false
            },
            balance: {
                type: String,
                required: false
            },
        },
    )
);

const tokenModel = mongoose.model('tokens', new mongoose.Schema(
    {
        address : {
            type : String,
            required : true
        },
        chainId : {
            type : String,
            required : true
        },
        token : {
            type : String,
            required : true
        },
        expiresAt : {
            type : Date,
            required : true
        }
    },
    {
        timestamps: true // Menambahkan createdAt & updatedAt
    }
)
)

module.exports = {userModel,tokenModel}