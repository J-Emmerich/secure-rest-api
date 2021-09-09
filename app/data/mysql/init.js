const mysql2 = require("mysql2/promise");
const { credentials } = require("../../config/config");

const {
  username: user,

  database,
  host,
  password,
} = credentials;

const firstInit = async () => {
  try {
    const connection = await mysql2.createConnection({
      host,
      user,
      password,
    });
    await connection.query(`DROP DATABASE IF EXISTS \`${database}\`;`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.query(`SHOW DATABASES;`);
    await connection.end();
  } catch (err) {
    console.log(err);
  }
};

firstInit();
