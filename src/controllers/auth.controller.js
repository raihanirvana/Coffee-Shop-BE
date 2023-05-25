const jwt = require("jsonwebtoken");
const authModels = require("../models/auth.model");
const { jwtSecret } = require("../configs/environment");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { body } = req;
    const result = await authModels.checkEmail(body.email);
    const results = await authModels.checkPhoneNumber(body.phone_number);

    if (result.rows.length > 0 && body.email === result.rows[0].email) {
      return res.status(403).json({
        msg: "Email Already Exist",
      });
    } else if (
      results.rows.length > 0 &&
      body.phone_number === results.rows[0].phone_number
    ) {
      return res.status(403).json({
        msg: "Phone Number Already Exist",
      });
    }
    body.pass = await bcrypt.hash(body.pass, 10);
    await authModels.register(body);
    res.status(200).json({
      msg: "Register Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { body } = req;
    const result = await authModels.userVerification(body);
    console.log(body);
    if (result.rows.length < 1)
      return res.status(401).json({
        msg: "email/password salah",
      });
    const { pass, ...userData } = result.rows[0];
    const isPasswordValid = await bcrypt.compare(body.pass, pass);
    if (!isPasswordValid)
      return res.status(401).json({ msg: "email/password anda salah" });
    const token = jwt.sign(userData, jwtSecret);
    console.log(userData.id);
    res.status(200).json({
      msg: "selamat datang ditoko kopi gacoan",
      token,
      userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Mendapatkan token dari header permintaan
    await authModels.addToBlacklist(token); // Menambahkan token ke daftar hitam
    res.status(200).json({
      msg: "logout berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const privateAcsess = (req, res) => {
  const { id, email } = req.authInfo;
  res.status(200).json({
    payload: { id, email },
    msg: "ok",
  });
};

const editPass = async (req, res) => {
  const { id } = req.authInfo;
  const { body } = req;
  try {
    const result = await authModels.getPassword(id);

    const passFromDb = result.rows[0].pass;
    isPasswordValid = await bcrypt.compare(body.oldPass, passFromDb);
    if (!isPasswordValid)
      return res.status(403).json({ msg: "password lama anda salah" });
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await authModels.editPassword(hashedPassword, id);
    res.status(200).json({
      msg: "edit password success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { body } = req;
  try {
    const result = await authModels.getEmail(body.email);

    if (result.rows.length === 0) {
      return res.status(403).json({
        msg: "Email anda tidak terdaftar",
      });
    }
    const emailFromDb = result.rows[0].email;
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otp_expiration = new Date(Date.now() + 5 * 60 * 1000); // 5 menit dari sekarang
    console.log(`OTP untuk email ${emailFromDb} adalah: ${otp}`);
    await authModels.addOTP(otp, otp_expiration, body.email);
    res.status(200).json({
      msg: "OTP telah terkirim, silahkan cek email anda!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Terjadi kesalahan pada server",
    });
  }
};

const changePass = async (req, res) => {
  const { body } = req;
  try {
    const otpResult = await authModels.getOTP(body.otp);
    if (otpResult.rows < 1) {
      return res.status(403).json({
        msg: "OTP yang anda masukkan salah",
      });
    }
    const dbOTPExpiration = otpResult.rows[0].otp_expiration;
    const currentDateTime = new Date();
    if (currentDateTime > dbOTPExpiration) {
      return res.status(403).json({
        msg: "OTP tidak valid atau telah kadaluwarsa",
      });
    }
    const hashedPassword = await bcrypt.hash(body.newPass, 10);
    await authModels.changeForgotpass(body.otp, hashedPassword);
    res.status(200).json({
      msg: "Forgot Password Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
  privateAcsess,
  editPass,
  register,
  forgotPassword,
  logout,
  changePass,
};
