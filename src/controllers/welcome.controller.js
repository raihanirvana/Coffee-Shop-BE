const path = require("path");
const { uploader } = require("../utils/cloudinary");

const welcomePage = (req, res) => {
  // res.json({
  //     msg : "selamat datang di toko kopi"
  // });
  res.status(200).sendFile(path.join(__dirname, "../html/response.html"));
};
const cloudUpload = async (req, res) => {
  try {
    // upload ke cloud
    const { data, err, msg } = await uploader(req, "Welcome", 8);
    if (err) throw { msg, err };
    if (!data) return res.status(200).json({ msg: "No File Uploaded" });
    res.status(201).json({ data, msg });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  welcomePage, // welcomePage: welcomePage
  cloudUpload,
};
