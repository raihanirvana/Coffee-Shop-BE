const path = require("path");

const welcomePage = (req, res) => {
  // res.json({
  //     msg : "selamat datang di toko kopi"
  // });
  res.status(200).sendFile(path.join(__dirname, "../html/response.html"));
};

module.exports = {
  welcomePage,
};
