const jwt = require("jsonwebtoken");
const { secret, adminUser } = require("../config/auth");

const getToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.toString().substring(7);
      jwt.verify(token, secret);
      next();
    } else {
      throw Error("Insert Authorization token");
    }
  } catch (error) {
    res.status(401).send(error.message);
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
    res.status(401).send(error.message);
  }
};

module.exports = { getToken, authenticateUser };
