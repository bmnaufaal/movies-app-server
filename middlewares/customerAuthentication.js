const { verifyToken } = require("../helpers/jwt");
const { Customer } = require("../models");

async function customerAuthentication(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) throw { name: "InvalidAccessToken" };
    let payload = verifyToken(access_token);
    if (!payload) throw { name: "InvalidAccessToken" };
    let customer = await Customer.findByPk(payload.id);
    if (!customer) throw { name: "Unauthenticated" };

    req.customer = {
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = customerAuthentication;
