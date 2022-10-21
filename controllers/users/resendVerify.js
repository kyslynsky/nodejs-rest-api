const { NotFound, BadRequest } = require("http-errors");
const { createVerifyEmail, sendEmail } = require("../../helpers");
const { User } = require("../../models/users");

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound("User not found");
    }
    
  if (user.verify) {
    throw new BadRequest("User alredy verify");
  }

  const mail = createVerifyEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerify;
