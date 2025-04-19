const jwt = require("jsonwebtoken");
const { tokenModel } = require("../models/dbModel");
const { verifyToken } = require("../utils/jwt");

exports.verifyAuth = async (req, res, next) => { // Tambahkan 'next' di parameter
  try {
    const address = req.query.address;

    if (!address) return res.status(401).json({ message: "Unauthorized" });

    const tokenExists = tokenModel.findOne({address});

    if (!tokenExists) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // req.user = decoded; // Simpan data user di req agar bisa digunakan di endpoint berikutnya
    next(); // PENTING! Lanjut ke middleware/route berikutnya
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};