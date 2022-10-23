const { BASE_URL, SENDER_EMAIL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    from: `${SENDER_EMAIL}`,
    subject: "Email verification",
    html: `
      <a target="_blank" href="${BASE_URL}/api/user/verify/${verificationToken}">Verify your email</a>`,
  };

  return mail;
};

module.exports = createVerifyEmail;
