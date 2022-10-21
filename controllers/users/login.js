const { Unauthorized, BadRequest } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/users");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user.verify) {
    throw new BadRequest("Email not verify");
  }

  if (!user || !user.validatePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    },
  });
};

module.exports = login;
