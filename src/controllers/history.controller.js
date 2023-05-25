const db = require("../configs/postgre");
const historyModel = require("../models/history.model");

const getHistoryHandler = async (req, res) => {
  const { id } = req.authInfo;
  try {
    const result = await historyModel.getHistory(id);
    res.status(200).json({
      history: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
    console.log(error);
  }
};
const patchStatus = async (req, res) => {
  const { ids } = req.params;
  const idArray = ids.split(",").map((id) => Number(id));
  const { status_id } = req.body;

  try {
    const promises = idArray.map((id) =>
      historyModel.patchStatusById(id, status_id)
    );
    await Promise.all(promises);

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    console.log(error);
  }
};

const getManageOrder = async (req, res) => {
  try {
    const result = await historyModel.manageOrder();
    res.status(200).json({
      history: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
    console.log(error);
  }
};

const insertHistory = (req, res) => {
  const { body } = req;
  historyModel.insertHistory(body, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal server error",
      });
      return;
    }
    const sql = `SELECT p.product_name AS product, s.status_name AS status 
                FROM history h 
                JOIN products p ON p.id = h.product_id 
                JOIN status s ON s.id = h.status_id 
                WHERE h.product_id = ${body.product_id} 
                AND h.status_id = ${body.status_id}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          msg: "Internal server error",
        });
        return;
      }
      res.status(201).json({
        data: result.rows,
      });
    });
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
      data: body,
    });
  });
};

const deleteHistory = (req, res) => {
  const { id } = req.params;
  historyModel.deleteHistory(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
    if (result === 0) {
      res.status(404).json({
        error: "Product not found",
      });
    }
    res.status(204).send();
  });
};

module.exports = {
  insertHistory,
  updateHistory,
  deleteHistory,
  getHistoryHandler,
  getManageOrder,
  patchStatus,
};
