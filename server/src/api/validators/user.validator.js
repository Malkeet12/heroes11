import Joi from "joi";

export function validateRegister(body) {
  let schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    name: Joi.string().min(3).max(24).required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    authDetails: Joi.object(),
    referralID: Joi.string().allow(""),
    // countryCode: Joi.string().min(1).max(4).required(),
    // language: Joi.string().valid('tr', 'en').required(),
    // deviceId: Joi.string().min(4).required()
  });
  //password: Joi.string().min(6).max(20).required()
  const { authDetails: { authenticationType = "", jwt = "" } = {} } = body;
  console.log("auth type", authenticationType);
  if (!(authenticationType === "oauth")) {
    console.log("here if password should be allowed");
    schema = Joi.object({
      email: Joi.string().email().min(3).required(),
      name: Joi.string().min(3).max(24).required(),
      phoneNumber: Joi.string().min(10).max(10).required(),
      password: Joi.string().min(6).max(20).required(),
      authDetails: Joi.object(),
      referralID: Joi.string().allow(""),
      // countryCode: Joi.string().min(1).max(4).required(),
      // language: Joi.string().valid('tr', 'en').required(),
      // deviceId: Joi.string().min(4).required()
    });
  }

  return schema.validate(body);
}

export function validateLogin(body) {
  let schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    authDetails: Joi.object(),
  });

  const { authDetails: { authenticationType = "", jwt = "" } = {} } = body;

  if (!(authenticationType === "oauth")) {
    schema = Joi.object({
      email: Joi.string().email().min(3).required(),
      password: Joi.string().min(6).max(20).required(),
      authDetails: Joi.object(),
    });
  }

  return schema.validate(body);
}

export function validateSendVerificationCode(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
  });
  return schema.validate(body);
}

export function validateVerifyEmail(body) {
  const schema = Joi.object({
    token: Joi.string().min(10).required(),
    code: Joi.string().length(4).required(),
  });
  return schema.validate(body);
}

export function validateRefreshToken(body) {
  const schema = Joi.object({
    refreshToken: Joi.string().min(10).required(),
  });
  return schema.validate(body);
}

export function validateForgotPassword(body) {
  const schema = Joi.object({
    password: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(body);
}

export function validateChangePassword(body) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(body);
}

export function validateEditUser(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24),
    username: Joi.string().min(3).max(15),
    language: Joi.string().valid("tr", "en"),
    gender: Joi.string().valid("male", "female", "other"),
    birthDate: Joi.date(),
  });
  return schema.validate(body);
}
