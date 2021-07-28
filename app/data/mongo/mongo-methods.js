const User = require("./models/user");
const mongoose = require("mongoose");

async function create(user) {
  const newUser = new User(user);
  mongoose.connection.once("connected", async () => {
    await newUser.save((err) => {
      if (err) console.log(`There was an error ${err}`);
    });
    console.log(`user has been created: ${newUser}`);
  });
}

module.exports = {
  create
};
