// eslint-disable-next-line no-unused-vars
const { Service } = require("../services/service");
const db = new Service();
// tạo mới tài khoản
const signUp = async (req, res, next) => {
	try {
		const body = req.body;
		const result = await db.create(body);
		console.log(result);
		next();
	} catch (error) {
		console.error(error.message);
	}
};
module.exports = { signUp };