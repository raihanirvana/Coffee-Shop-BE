const historyModel = require("../models/history.model");

const getHistory = (req, res) => {
  const { query } = req;
  historyModel.getHistory(query, (err, result) => {
    if (err) {
      res.status(500).json({
        msg: "internal server error",
      });
      return;
    }
    if (!result) {
      res.status(404).json({
        msg: "History not found",
      });
      return;
    }
    if (result.rows.length === 0) {
      res.status(400).json({
        msg: "No history data found",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  });
};

const insertHistory = (req, res) => {
  const { body } = req;
  historyModel.insertHistory(body, (err, result) => {
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

const updateHistory = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  historyModel.updateHistory(id, body, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }
    if (result.rowCount === 0) {
      res.status(404).json({
        message: `Product with id ${id} not found`,
      });
      return;
    }
    res.status(200).json({
      message: "History updated successfully",
    });
  });
};

const deleteHistory = (req, res) => {
  const { id } = req.params;
  historyModel.deleteHistory(id, (err, result) => {
    if (err) {
      if (err.status === 400) {
        res.status(400).json({
          msg: "the server cannot or will not process the request due to something that is perceived to be a client error",
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
  getHistory,
  insertHistory,
  updateHistory,
  deleteHistory,
};
