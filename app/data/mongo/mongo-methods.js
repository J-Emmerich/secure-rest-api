const User = require("./models/user");

async function create(user) {
  const newUser = new User(user);
  await newUser.save((err) => {
    if (err) console.log(`There was an error ${err}`);
  });
  return newUser;
}

module.exports = { create };
