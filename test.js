const axios = require("axios");
const urlApi = "http://localhost:8000";
console.log("testing");
let url = `${urlApi}/api/sign-up`;
// eslint-disable-next-line no-undef
// test("POST /api/sign-up 201 http code on success", async () => {
// 	const rd = Math.floor(Math.random() * 1000) + 1;
// 	const user ={
// 		"firstName":"Test",
// 		"lastName":"Test",
// 		"email":`nvnguy${rd}@gmail.com`,
// 		"password":"12345678"
// 	};
// 	console.log(url);
// 	const response = await axios.post(url,user);
// 	console.log("statusCode",response.status);
// 	// eslint-disable-next-line no-undef
// 	expect(response.status).toBe(201);
// 	// eslint-disable-next-line no-undef
// 	expect(response.statusText).toBe("Created");

// });
//eslint-disable-next-line no-undef
test("POST /api/sign-up (400 http code on validation error)", async () => {
	const rd = Math.floor(Math.random() * 1000) + 1;
	const user ={
		"firstName":"Test",
		"lastName":"Test",
		"email":`com`,
		"password":"12345678"
	};
	console.log(url);
	const response = await axios.post(url,user);
	console.log("statusCode",response.status);
	// eslint-disable-next-line no-undef
	//expect(response.status).toBe(400);

});

