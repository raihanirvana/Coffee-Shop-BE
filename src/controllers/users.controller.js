const userModel = require("../models/users.model");

const getUsers = (req, res) => {
  userModel.getUsers((err, result) => {
    if (err) {
      return res.status(500).json({
        msg: "Internal server error",
      });
    }
    res.status(200).json({
      data: result.rows,
    });
  });
};

const insertUsers = (req, res) => {
  const { body } = req;
  userModel.insertUsers(body, (err, result) => {
    if (err) {
      if (err.status === 400) {
        res.status(400).json({
          msg: "the server cannot or will not process the request due to something that is perceived to be a client error",
        });
        return;
      } else {
        res.status(500).json({
          msg: "Internal server error",
        });
        return;
      }
    } else {
      res.status(201).json({
        data: body,
      });
    }
  });
};

const updateUsers = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  userModel.updateUsers(id, body, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: body,
    });
  });
};

const deleteUsers = (req, res) => {
  const { id } = req.params;
  userModel.deleteUsers(id, (err, result) => {
    if (err) {
      if (err.status === 400) {
        res.status(400).json({
          msg: "the server cannot or will not process the request due to something that is perceived to be a client error",
        });
        return;
      }
    } else if (result === 0) {
      res.status(404).json({
        error: "Users not found",
      });
    } else {
      res.status(204).json({
        msg: "delete user sucessesfull",
      });
    }
  });
};

module.exports = {
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
};
