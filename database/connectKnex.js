
"use strict";
require("dotenv").config({ path: "./../.env" });
// const knex = require("knex")({
// 	client: "mysql",
// 	connection: {
// 		host: "127.0.0.1",
// 		port: 3306,
// 		user: "root",
// 		password: "Mothaiba@$%^",
// 		database: "entrance_test"
// 	},
// 	pool: { min: 0, max: 7 }
// });
const knex = require("knex")({
	client: "mysql",
	connection: {
		host: "178.128.109.9",
		port: 3306,
		user: "root",
		password: "PlsDoNotShareThePass123@",
		database: "entrance_test"
	},
	pool: { min: 0, max: 7 }
});

// eslint-disable-next-line no-undef
console.log(process.env.HOST_TEST);

module.exports = { knex };