const { success, errorsResponse, parseJwt } = require("../../common/common");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const saltRounds = 10;

const { validationResult } = require("express-validator");
const { Service } = require("../../services/service");
// eslint-disable-next-line no-undef
const secret = process.env.SECRET;
// eslint-disable-next-line no-undef
const expiresIn = process.env.expiresIn;
// eslint-disable-next-line no-unused-vars, no-undef
const refreshTokenexpiresIn = process.env.refreshTokenexpiresIn;
//const errorHandler = require("./../../helpers/error-handler");
const service = new Service();

const signUp = async (req, res, next) => {
	try {
		console.log("signUp");
		console.log(req.body);
		service.tableName = "users";
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//res.status(400).json({ errors: errors.array() });
			errorsResponse(res, next, { errors: errors.array() }, 400, "http code on validation error");
			return;
		}
		let data = req.body;
		const isEmail = await service.getEmail(data.email);
		if (isEmail) {
			success(res, next, `Email:${data.email} already exists`);
			return;
		}
		const salt = bcrypt.genSaltSync(saltRounds);
		data.password = await bcrypt.hashSync(data.password, salt);
		const ids = await service.upset(data);
		if (!ids) {
			return res
				.status(400)
				.send("There is an error in too the account, please try again.");
		}
		data.displayName = `${data.firstName} ${data.lastName}`;
		data.id = ids[0];
		// eslint-disable-next-line no-unused-vars
		const { password, ...result } = data;
		success(res, next, result,201);
		return;
	} catch (error) {
		console.error(error.message);
		errorsResponse(res, next, null, 500, "http code on internal error");
	}
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const signIn = async (req, res, next) => {
	console.log("signIn");
	// eslint-disable-next-line no-undef
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		//res.status(400).json({ errors: errors.array() });
		errorsResponse(res, next, { errors: errors.array() }, 400, "http code on validation error");
		return;
	}
	service.tableName = "users";
	let data = req.body;
	console.log(data);
	//let {}
	const user = await service.getUser(data);

	if (user) {
		const math = bcrypt.compareSync(data.password, user.password);
		try {
			if (math) {
				console.log(expiresIn,refreshTokenexpiresIn);
				// eslint-disable-next-line no-undef
				const refreshToken = jwt.sign({ sub: user.id}, `${secret}xnv_9`, { expiresIn:refreshTokenexpiresIn });
				// đúng mật khẩu
				const token = jwt.sign({ sub: user.id }, secret, { expiresIn: expiresIn });
				// eslint-disable-next-line no-unused-vars
				const { password, ...result } = user;
				const dt = { user: result, token: token, refreshToken };

				const tokenTb = { userId: user.id, refreshToken, expiresIn, createdAt: new Date(), updatedAt: new Date() };
				await upsertToken(tokenTb, "tokens");
				success(res, next, dt, 200);
			} else {
				success(res, next, null, 401, "Password is invalid");
			}
		} catch (error) {
			console.error(error.message);
		}

		return;
	} else {
		success(res, next, `Email:${data.email} already exists`);
	}
};
const upsertToken = async (obj, tableName) => {
	const checkToken = await service.getAll({ userId: obj.userId }, tableName);
	if (checkToken) {
		await service.update(checkToken, tableName);
	} else {
		await service.create(obj, tableName);
		console.log("create token");
	}
};
const logout = async (req, res, next) => {
	try {
		const userId = req.body;
		//console.log("userId",userId);
		const _token = await service.getAll(userId, "tokens");
		console.log(_token);
		if (_token) {
			const del = await service.deleteId(userId, "tokens");
			console.log("delete token", del);
			success(res, next, null, 204);
		} else {
			errorsResponse(res, next, null, 200);
		}
		//console.log("parseJwt",parseJwt(refreshToken).sub);

	} catch (error) {
		console.error(error.message);
		errorsResponse(res, next, null, 400, error.message);
	}
};
const refreshToken = async (req, res, next) => {
	try {
		const body = req.body;
		console.log("body",req.body);
		const oldRefreshToken = await service.getAll(body, "tokens");
		console.log("oldx",oldRefreshToken);
		if(!oldRefreshToken){
			errorsResponse(res, next, null, 400, "refreshToken does not exist.");
			return;
		}
		const payload = parseJwt(oldRefreshToken.refreshToken);
		const newToken = jwt.sign({ sub:  payload.sub }, secret, { expiresIn: expiresIn });
		const newRefreshToken = jwt.sign({ sub:  payload.sub }, secret, { expiresIn: refreshTokenexpiresIn });
		success(res, next, {token: newToken,newRefreshToken}, 200);
	} catch (error) {
		console.log( "refreshToken",error.message);
		errorsResponse(res, next, null, 400, error.message);
	}
};
module.exports = {
	signUp, signIn, logout, refreshToken
};