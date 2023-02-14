const jwt = require("jsonwebtoken");
const key = "secret_key";

const createToken = (payload) => jwt.sign(payload, key);

module.exports = { createToken };
