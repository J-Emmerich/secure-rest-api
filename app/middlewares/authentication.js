const jwt = require("jsonwebtoken");
const { secret, adminUser } = require("../config/auth");

const getToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.toString().substring(7);
    if (authorization && token) {
      const auth = jwt.verify(token, secret);
      next();
    } else {
      throw Error("Not Authorized");
    }
  } catch (error) {
    next(error);
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // Checking if username and password are correct
    if (username === adminUser.username && password === adminUser.password) {
      const token = jwt.sign({ username }, secret, {
        expiresIn: "1h",
      });
      req.token = token;
      next();
    } else {
      throw Error("Username or password are not correct!");
    }
  } catch (error) {
    next(error.message);
  }
};

module.exports = { getToken, authenticateUser };
