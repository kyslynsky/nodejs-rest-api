const fs = require("fs/promises");
const { join } = require("path");
const Jimp = require("jimp");
const { User } = require("../../models/users");

const avatarsDir = join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, filename } = req.file;

    const [extention] = filename.split(".").reverse();
    const avatarName = `${_id}.${extention}`;

    const resultUpload = join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);

    const img = await Jimp.read(resultUpload);
    await img.cover(250, 250).write(resultUpload);

    const avatarURL = join("avatars", resultUpload);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
