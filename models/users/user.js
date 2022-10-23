const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const passwordRegexp = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
const emailRegexp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      trim: true,
      required: [
        true,
        "A password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces",
      ],
      match: passwordRegexp,
    },
    email: {
      type: String,
      match: emailRegexp,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    token: {
      type: String,
      default: null,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: [true, "Avatar is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const joiUserSchema = Joi.object({
  email: Joi.string().email().trim().pattern(emailRegexp).required(),
  password: Joi.string()
    .min(6)
    .pattern(passwordRegexp)
    .trim()
    .required()
    .messages({
      "string.pattern.base":
        "A password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces",
    }),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().trim().pattern(emailRegexp).required(),
});

const User = model("user", userSchema);

const schemas = {
  joiUserSchema,
  subscriptionSchema,
  verifyEmailSchema,
};

module.exports = {
  User,
  schemas,
};
