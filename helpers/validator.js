// eslint-disable-next-line no-undef
const { check } = require("express-validator");

const validateEmailAandPass = () => {
	//console.log(check("email"))
	return [
		check("email", "Invalid does not Empty").not().isEmpty(),
		check("email", "Invalid email").isEmail(),
		check("password", "Password must be between 8-20 characters").isLength({ min: 8, max: 20 })
	];
};


// eslint-disable-next-line no-undef
module.exports = { validateEmailAandPass };