
// eslint-disable-next-line no-undef
const {knex} = require("./index");
/**
 * users  table
 */

const createUsersTable =async(knex)=>{
	try {
		const tbl = "users";
		const hasTable = await knex.schema.hasTable(tbl);
		if(hasTable){
			console.log(`${tbl} table already exists!`);
			return;
		}
		await knex.schema
			.createTable(tbl, table => {
				table.increments("id", {
					primaryKey: true,
					notNullable: true,
				});
				table.string("firstName", 30);
				table.string("lastName", 30);
				table.string("email", 250).notNullable();
				table.string("password", 250).notNullable();
				table.datetime("createdAt").notNullable();
				table.datetime("updatedAt").notNullable();
			});
		console.log(`${tbl} table created successfully!`);

	} catch (error) {
		console.error(error.message);
	}
};

(async()=>{
	console.log("users");
	await createUsersTable(knex);
})();