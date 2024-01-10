import bcrypt from 'bcrypt';

//crear hash
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//validar hash
const isValidatePassword = (hashedPassword, password) =>
  bcrypt.compareSync(password, hashedPassword);

  export { createHash, isValidatePassword };