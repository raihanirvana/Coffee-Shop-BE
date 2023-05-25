const path = require("path");
const { uploader } = require("../utils/cloudinary");
const welcomeModels = require("../models/welcome.model");

const welcomePage = (req, res) => {
  // res.json({
  //     msg : "selamat datang di toko kopi"
  // });
  res.status(200).sendFile(path.join(__dirname, "../html/response.html"));
};
const cloudUpload = async (req, res, next) => {
  try {
    const { file } = req;

    if (file) {
      const { secure_url } = await uploader(file, "Welcome", 8);
      if (!secure_url) {
        throw new Error("Error uploading file to cloud");
      }
      req.uploadResult = secure_url;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfileController = (req, res) => {
  const { authInfo, uploadResult, body } = req;
  const updateFields = {};
  if (authInfo.id) updateFields.id = authInfo.id;
  if (body.email) updateFields.email = body.email;
  if (uploadResult) {
    updateFields.image = uploadResult;
  }
  if (body.phone_number) updateFields.phone_number = body.phone_number;
  if (body.first_name) updateFields.first_name = body.first_name;
  if (body.last_name) updateFields.last_name = body.last_name;
  if (body.display_name) updateFields.display_name = body.display_name;
  if (body.birthday) updateFields.birthday = body.birthday;
  if (body.address) updateFields.address = body.address;
  if (body.gender) updateFields.gender = body.gender;
  welcomeModels.updateProfile(authInfo.id, updateFields, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }
    if (
      Object.keys(updateFields).length === 1 &&
      updateFields.hasOwnProperty("id")
    ) {
      res.status(200).json({
        message: "Nothing changed",
      });
      return;
    }

    res.status(200).json({
      message: "Profile updated successfully",
      result,
    });
  });
};
module.exports = {
  welcomePage, // welcomePage: welcomePage
  cloudUpload,
  updateProfileController,
};
