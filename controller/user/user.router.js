console.log("router user");

const { celebrate } = require("celebrate");
const { signUpUserDto, signInUserDto } = require("./user.dto");
const validate = require("../../helpers/validator");
const { signUp, signIn, logout ,refreshToken} = require("./user.controller");

module.exports = (app) => {
	app.post("/api/sign-up", celebrate(signUpUserDto), validate.validateEmailAandPass(), signUp);
	app.post("/api/sign-in", celebrate(signInUserDto), validate.validateEmailAandPass(), signIn);
	app.post("/api/logout", logout);
	app.post("/api/refresh-token", refreshToken);
};
