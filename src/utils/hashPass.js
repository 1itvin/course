const bcrypt = require("bcryptjs");

exports.hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

exports.isPasswordValid = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};
