// eslint-disable-next-line no-unused-vars
const { Joi, Segments } = require("celebrate");
const signUpUserDto = {
	[Segments.BODY]: Joi.object().keys({
		firstName: Joi.string(),
		lastName: Joi.string(),
		email: Joi.string().required(),
		password: Joi.string().required(),
		createdAt: Joi.date(),
		updatedAt: Joi.date(),
	})
};
const signInUserDto = {
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required()
	})
};
module.exports = { signInUserDto, signUpUserDto };