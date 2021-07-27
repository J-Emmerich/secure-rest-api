const connection = function () {
  console.log("Sequelize is now connected");
};

async function create(user) {
  console.log(
    `We ***** from sequelize *****
       received and created this user: ${user},
        with ${user.id}, ${user.name}, ${user.dateOfRegister}`
  );
}

module.exports = { create, connection };
