const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configs/environment");
const authModels = require("../models/auth.model");

const checkToken = async (req, res, next) => {
  const bearerToken = req.header("authorization");
  console.log(bearerToken);
  if (!bearerToken)
    return res.status(403).json({
      msg: "silahkan login terlebih dahulu",
    });
  const token = bearerToken.split(" ")[1];
  const isBlacklisted = await authModels.isTokenBlacklisted(token); // memeriksa apakah token telah dimasukkan ke dalam daftar hitam
  if (isBlacklisted)
    return res.status(401).json({
      msg: "Token tidak valid atau telah kedaluwarsa",
    });
  jwt.verify(token, jwtSecret, (err, payload) => {
    if (err && err.name)
      return res.status(403).json({
        msg: err.message,
      });
    if (err)
      return res.status(500).json({
        msg: "internal server error",
      });
    req.authInfo = payload;
    console.log(payload);
    next();
  });
};

const adminRole = async (req, res, next) => {
  const { role_id } = req.authInfo;
  if (role_id !== 2) {
    return res.status(403).json({
      msg: "only admin can have this accsess",
    });
  }
  next();
};

module.exports = { checkToken, adminRole };
