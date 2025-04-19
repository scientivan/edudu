require('dotenv').config();
const express = require('express');
const {userModel, tokenModel} = require('../models/dbModel')
const router = express.Router();
const {generateToken}= require('../utils/jwt');
const {verifyAuth} = require('../middleware/checkAuth');

// router.get('/check-auth', (req, res) => {
//   res.header('Access-Control-Allow-Origin', 'http://host:5173');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   if (res.locals.isAuthenticated) {
//     res.status(200).json({ authenticated: true });
//   } else {
//     res.status(401).json({ authenticated: false });
//   }

// });

router.get("/check-auth", verifyAuth, (req, res) => {
  res.json({ authenticated: true, user_id: req.user_id });
});

router.post("/api/wallet-connect", async (req, res) => {
  const { address, chainId, networkName, balance } = req.body;
  // console.log("Wallet connected:", address, chainId, networkName, balance);
  const userData = {
    address,
    chainId,
    networkName,
    balance
};
  await generateToken({address : userData.address,chainId : userData.chainId})
  
  const isUser = await userModel.findOne({address: userData.address})
  if(!isUser){
    await userModel.insertMany(userData)
    res.status(200).json("User created successfully")
    // console.log('user created successfully')
  }
  else{
    // console.log('user is already defined')
    res.status(200).json("User is already defined")
  }

  // res.json({ status: "ok", message: "Wallet connected successfully" });
});


// Logout user
router.post('/logout', async (req, res) => {
  const { address} = req.body;
  // console.log(address)
  if (address) {
    await tokenModel.deleteMany({ address });
  }
  return res.status(200).json({ message: 'Logout berhasil' });
});



module.exports = router;
