async function create(user) {
  console.log(
    `We ***** from sequelize *****
       received and created this user: ${user},
        with ${user.id}, ${user.name}, ${user.dateOfRegister}`
  );
}

module.exports = { create };
