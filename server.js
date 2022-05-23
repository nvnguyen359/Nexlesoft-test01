console.log("Running server");
// eslint-disable-next-line no-undef
const { errors} = require("celebrate");
const express = require("express");
const app = express();
const PORT = 8000;
console.log("post",PORT);
require("./loader/loader")(app,PORT);
// eslint-disable-next-line no-undef
const server = require("http").Server(app);
server.listen(PORT);
// eslint-disable-next-line no-undef
app.use(errors());