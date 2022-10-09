const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = getCurrent;
