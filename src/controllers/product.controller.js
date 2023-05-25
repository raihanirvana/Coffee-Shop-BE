const productModel = require("../models/product.model");
const { uploader } = require("../utils/cloudinary");

const getProduct = async (req, res) => {
  try {
    const { query } = req;
    const { rows } = await productModel.getProduct(query);
    if (rows.length === 0) {
      res.status(404).json({
        msg: "Product not found",
      });
      return;
    }
    const meta = await productModel.getMetaProducts(query);
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
  inputModels.updateProfile(authInfo.id, updateFields, (err, result) => {
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
    });
  });
};

const insertProduct = (req, res) => {
  const { body, uploadResult } = req;

  if (
    !body.product_name ||
    !body.price ||
    !body.category_id ||
    !uploadResult ||
    !body.description
  ) {
    return res.status(400).json({
      msg: "Tidak dapat memproses permintaan. Data yang diperlukan tidak lengkap.",
    });
  }

  productModel.insertProduct(body, uploadResult, (err, result) => {
    if (err) {
      if (err.status === 400) {
        res.status(400).json({
          msg: "The server cannot or will not process the request due to something that is perceived to be a client error.",
        });
        return;
      } else {
        console.log(err);
        res.status(500).json({
          msg: "Internal server error.",
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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, uploadResult } = req;
    const updateFields = {};

    if (body.product_name) updateFields.product_name = body.product_name;
    if (body.price) updateFields.price = body.price;
    if (body.category_id) updateFields.category_id = body.category_id;
    if (body.description) updateFields.description = body.description;

    if (uploadResult) {
      updateFields.image = uploadResult;
    }

    const result = await productModel.updateProduct(id, updateFields);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: `Product with id ${id} not found`,
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  productModel.deleteProduct(id, (err, result) => {
    if (err) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
    res.status(204).json({
      msg: "Delete Product Succsess",
    });
  });
};

module.exports = {
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  cloudUpload,
  updateProfileController,
};
