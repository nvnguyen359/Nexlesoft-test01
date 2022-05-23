console.log("loader");
// eslint-disable-next-line no-undef
require("dotenv").config();
// eslint-disable-next-line no-undef
const { getFiles, errorsResponse } = require("./../common/common");
const jwt = require("./../helpers/jwt");

/**
 * call all model create 
 */
const initModels = () => {
	const pathForder = "./models";
	//  console.log(pathForder);
	let array = getFiles(pathForder);
	//console.log(array);
	array.children.forEach(element => {
		// eslint-disable-next-line no-undef
		require(`../${element.path}`);
	});
};
const initApis = (app) => {
	require("../controller/user/user.router")(app);
};
const setup = (app, PORT) => {
	// eslint-disable-next-line no-undef
	const bodyParser = require("body-parser");
	// eslint-disable-next-line no-undef
	const cors = require("cors");
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));
	//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
	// app.use(bodyParser()); // lấy thông tin từ form HTML
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors({ origin: "*" }));
	app.use(jwt());
	app.use(function (err, req, res, next) {
		if (err.name === "UnauthorizedError") {
			errorsResponse(res, next, null, 401, "No authorization token was found");
		}
	});
	// eslint-disable-next-line no-undef
	app.get("/", function (req, res) {
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

		// Request headers you wish to allow
		res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
		res.send({ code: 200, message: `run server ... host :${PORT}` });
	});
};

module.exports = (app, PORT) => {
	setup(app,PORT);
	initModels();
	initApis(app, PORT);
};