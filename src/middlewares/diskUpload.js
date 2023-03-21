const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = "./public/images";
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const filename = `images-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const limits = 2e6;

const fileFilter = (req, file, cb) => {
  const pattern = /jpg|png/i;
  const ext = path.extname(file.originalname);
  if (!pattern.test(ext)) {
    const err = new Error("Only JPG and PNG files are allowed");
    err.status = 400;
    return cb(err, false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = {
  singleUpload: (fieldName) => upload.single(fieldName),
  multiUpload: (fieldName, maxCount) => upload.array(fieldName, maxCount),
  multiFieldUpload: (fieldList) => upload.fields(fieldList),
};
