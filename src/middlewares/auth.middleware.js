const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configs/environment");

const checkToken = (req, res, next) => {
  const bearerToken = req.header("authorization");
  console.log(bearerToken);
  if (!bearerToken)
    return res.status(403).json({
      msg: "silahkan login terlebih dahulu",
    });
  const token = bearerToken.split(" ")[1];
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
    next();
  });
};

module.exports = { checkToken };
