
// eslint-disable-next-line no-undef
const {knex} = require("./index");
const createTableTokens = async (knex) => {
	const tbl = "tokens";
	const hasTable = await knex.schema.hasTable(tbl);
	if (hasTable) {
		console.log(`${tbl} table already exists!`);
		return;
	}
	await knex.schema
		.createTable(tbl, table => {
			table.increments("id", {
				primaryKey: true,
				notNullable: true,
			});
			table
				.integer("userId")
				.unsigned()
				.references("users.id");
			table.string("refreshToken", 250).notNullable();
			table.string("expiresIn", 64).notNullable();
			table.datetime("createdAt").notNullable();
			table.datetime("updatedAt").notNullable();
		});
	console.log("done");
};
(async()=>{
	await createTableTokens(knex);
})();