const jwt = require('jsonwebtoken')
const {tokenModel} = require('../models/dbModel')

// const addTokenToDatabase = async ({token,address,chainId}) => {
//     await tokenModel.create({ token, address, chainId,expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
// }

const generateToken = async ({address,chainId}) => {
    const token = jwt.sign(
    {
        address,
        chainId
    },
    process.env.JWT_SECRET,
    {expiresIn : '3h'}
    )
    await tokenModel.create({ token, address, chainId,expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
    return token
}


// const verifyToken = (token) => {
//     return jwt.verify(token,process.env.JWT_SECRET)
// }

module.exports = {generateToken}