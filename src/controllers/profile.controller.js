const inputModels = require("../models/profile.model");

const insertProfile = async (req, res) => {
  const { authInfo, body } = req;
  try {
    const result = await inputModels.inputProfile(authInfo.id, body);
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

module.exports = { insertProfile };
