const bcrypt = require("bcrypt");

// creating a const for storing the salt round for creating the password hash
const SALT_ROUND = 10;

// method below is used to create the password hash for the password entered by the
// user
createPasswordHash = async (userPassword) => {
  try {
    // using the hash() method from the bcrypt module to create the password hash
    const passwordHash = await bcrypt.hash(userPassword, SALT_ROUND);
    return passwordHash;
  } catch (err) {
    console.log("error while creating the password hash: ");
    console.log(err);
    throw err;
  }
};

module.exports = {
  createPasswordHash,
};
