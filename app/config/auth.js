const adminUser = {
  username: "HelloWorld",
  password: "QWERTYForever",
};

// In prod this should be in .env
const secret = "1234Secret";

module.exports = { secret, adminUser };
