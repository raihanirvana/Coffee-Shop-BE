const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const { user } = require("../configs/environment");

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

const updateUsers = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  bcrypt.hash(body.pass, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        msg: "internal server error",
      });
    }
    userModel.updateUsers(id, body, hash, (err, result) => {
      if (err) {
        return res.status(500).json({
          msg: "internal server error",
        });
      }
      delete body.pass;
      res.status(200).json({
        msg: "User berhasil di update",
        data: body,
      });
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
  updateUsers,
  deleteUsers,
};
