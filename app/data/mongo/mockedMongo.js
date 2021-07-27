const connection = function () {
  console.log("MongoDB is now connected");
};

async function createB(user) {
  console.log(
    `We ***** from mongoose *****
       received and created this user: ${user}, with ${user.id},
        ${user.name}, ${user.dateOfRegister}`
  );
}

module.exports = { createB, connection };
