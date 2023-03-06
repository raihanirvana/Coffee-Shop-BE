const userModel = require("../models/users.model");

const getUsers = (req, res) => {
  userModel.getUsers((err, result) => {
    if (err) {
      if (err.status === 300) {
        res.status(300).json({
          msg: "Custom error message for status code 300",
        });
        return;
      } else if (err.status === 400) {
        res.status(400).json({
          msg: "Custom error message for status code 400",
        });
        return;
      } else {
        res.status(500).json({
          msg: "Internal server error",
        });
        return;
      }
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
      if (err.status === 300) {
        res.status(300).json({
          msg: "Custom error message for status code 300",
        });
        return;
      } else if (err.status === 400) {
        res.status(400).json({
          msg: "Custom error message for status code 400",
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
        data: result,
      });
    }
  });
};

const updateUsers = (req, res) => {
  const usersId = req.params.id;
  const { email, password, phone_number } = req.body;

  userModel.Users.findById(usersId, (err, users) => {
    if (err) {
      res.status(500).json({
        msg: "internal server error",
      });
    } else {
      if (users === null) {
        res.status(404).json({
          msg: "Users not found",
        });
      } else {
        users.email = email;
        users.password = password;
        users.phone_number = phone_number;
        users.save((err, updatedUsers) => {
          if (err) {
            if (err.status === 300) {
              res.status(300).json({
                msg: "Custom error message for status code 300",
              });
              return;
            } else {
              res.status(500).json({
                msg: "Internal server error",
              });
              return;
            }
          } else {
            res.status(200).json({
              msg: "Users updated successfully",
              data: updatedUsers,
            });
          }
        });
      }
    }
  });
};

const deleteUsers = (req, res) => {
  const { id } = req.params;
  userModel.deleteUsers(id, (err, result) => {
    if (err) {
      if (err.status === 300) {
        res.status(300).json({
          error: "Custom error message for status code 300",
        });
        return;
      } else {
        res.status(500).json({
          error: "Internal server error",
        });
        return;
      }
    } else if (result === 0) {
      res.status(404).json({
        error: "Product not found",
      });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = {
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
};
