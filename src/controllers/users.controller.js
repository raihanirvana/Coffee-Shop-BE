const userModel = require("../models/users.model");
const { uploader } = require("../utils/cloudinary");

const getUsersHandler = async (req, res) => {
  try {
    const { id } = req.authInfo;
    const result = await userModel.getUsers(id);
    res.status(200).json({
      user: result.rows[0],
    });
    // Lakukan sesuatu dengan data pengguna yang ditemukan
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const insertUsers = async (req, res) => {
  try {
    const { body } = req;
    const result = await userModel.checkEmail(body.email);
    const results = await userModel.checkPhoneNumber(body.phone_number);

    if (result.rows.length > 0 && body.email === result.rows[0].email) {
      res.status(403).json({
        msg: "Email Already Exist",
      });
    } else if (
      results.rows.length > 0 &&
      body.phone_number === results.rows[0].phone_number
    ) {
      res.status(403).json({
        msg: "Phone Number Already Exist",
      });
    } else {
      await userModel.insertUsers(body);

      res.status(200).json({
        msg: "Create Account Success",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const cloudUpload = async (req, res) => {
  try {
    // upload ke cloud
    const { params } = req;
    const { data, err, msg } = await uploader(req, "product", params.id);
    if (err) throw { msg, err };
    if (!data) return res.status(200).json({ msg: "No File Uploaded" });
    return data;
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
  // console.log(error)
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updateFields = {};
  if (body.email) updateFields.email = body.email;
  if (body.phone_number) updateFields.phone_number = body.phone_number;
  if (body.first_name) updateFields.first_name = body.first_name;
  if (body.last_name) updateFields.last_name = body.last_name;
  if (body.display_name) updateFields.display_name = body.display_name;
  if (body.birthday) updateFields.birthday = body.birthday;
  if (body.address) updateFields.address = body.address;
  userModel.updateUsers(id, updateFields, (err, result) => {
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

const deleteUsers = (req, res) => {
  const { id } = req.params;
  userModel.deleteUsers(id, (err, result) => {
    if (err) {
      return res.status(404).json({
        msg: "id tidak ditemukan",
      });
    }
    if (err) {
      return res.status(500).json({
        msg: "internal server error",
      });
    }
    console.log(result.rows);
    res.status(200).json({
      msg: "Delete user berhasil",
    });
  });
};

module.exports = {
  getUsersHandler,
  insertUsers,
  updateUser,
  deleteUsers,
  cloudUpload,
};
