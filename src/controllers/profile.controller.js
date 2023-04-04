const inputModels = require("../models/profile.model");

const insertProfile = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await inputModels.inputProfile(id, req.body);
    console.log(result);
    res.status(200).json({
      msg: "insert berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const updateProfileController = (req, res) => {
  const { authInfo, body } = req;
  const updateFields = {};
  if (authInfo.id) updateFields.user_id = authInfo.id;
  if (body.first_name) updateFields.first_name = body.first_name;
  if (body.last_name) updateFields.last_name = body.last_name;
  if (body.display_name) updateFields.display_name = body.display_name;
  if (body.address) updateFields.address = body.address;
  inputModels.updateProfile(authInfo.id, updateFields, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }
    if (result.rowCount === 0) {
      res.status(404).json({
        message: `Profile with id ${authInfo.id} not found`,
      });
      return;
    }
    res.status(200).json({
      message: "Profile updated successfully",
    });
  });
};

module.exports = { insertProfile, updateProfileController };
