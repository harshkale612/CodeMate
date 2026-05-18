const validator = require("validator");

const validSignUpData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if (!(firstName || lastName)) {
    throw new Error("Name is invalid");
  }

  if (!validator.isEmail(emailID)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Passoward is weak create strng password");
  }
};

module.exports = { validSignUpData };
