// eslint-disable-next-line no-undef
require("dotenv").config();
// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV == "production" ? "production" : "development";
// eslint-disable-next-line no-undef
const config = require(__dirname + "/../config/config.json")[env];
// eslint-disable-next-line no-undef
const connecStringMYSQL = process.env.MYSQL_TEST;
// eslint-disable-next-line no-undef
const knex = require("knex")(config);
// eslint-disable-next-line no-undef
module.exports = {
	connecStringMYSQL,
	knex
};