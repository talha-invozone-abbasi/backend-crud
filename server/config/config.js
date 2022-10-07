require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_SECRET,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_USERNAME,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_SECRET,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_USERNAME,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_SECRET,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_USERNAME,
  },
};
