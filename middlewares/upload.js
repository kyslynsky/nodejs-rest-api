const multer = require("multer");
const { join } = require("path");
const { BadRequest } = require("http-errors");

const tempDir = join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const checkFileType = (file, cb) => {
  const fileType = /jpg|jpeg|png/;
  const mimetype = fileType.test(file.mimetype);
  if (mimetype) {
    return cb(null, true);
  } else {
    cb(new BadRequest("Only images support!"), false);
  }
};

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: 3145728 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
