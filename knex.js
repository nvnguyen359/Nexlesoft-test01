require("dotenv").config();
// eslint-disable-next-line no-undef
const knex = require("knex")({
	client: "mysql",
	connection: {
		host: "127.0.0.1",
		port: 3306,
		user: "root",
		password: "Mothaiba@$%^",
		database: "entrance_test"
	},
	pool: { min: 0, max: 7 }
});

const createTableUser = async () => {

};
(async () => {
	// eslint-disable-next-line no-undef
	console.log(process.env.HOST_TEST);

})();