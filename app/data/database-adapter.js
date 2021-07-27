// This file make each method standard and exports to database-access.

// Crud OPERATIONS
async function create(database, user) {
  if (database.name === "mongodb") {
    await database.createB(user);
  } else if (database.name === "mysql") {
    await database.create(user);
  }
}

module.exports = { create };
