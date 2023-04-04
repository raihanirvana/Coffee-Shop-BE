const userModel = require("../models/users.model");

const getUsers = async (req, res) => {
  try {
    const { query } = req;
    const { rows } = await userModel.getUsers(query);
    if (rows.length === 0) {
      res.status(404).json({
        msg: "Users not found",
      });
      return;
    }
    const meta = await userModel.getMetaUsers(query);
    res.status(200).json({
      data: rows,
      meta,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const insertUsers = (req, res) => {
  const { body } = req;
  userModel.insertUsers(body, (err, result) => {
    if (err) {
      return res.status(500).json({
        msg: "Email/Phone Number sudah terdaftar/Internal Server Sedang Error, Silahkan Coba Beberapa Saat Lagi",
      });
    }
    res.status(200).json({
      msg: "Insert User Berhasil",
      data: body,
    });
  });
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
  getUsers,
  insertUsers,
  updateUser,
  deleteUsers,
};
