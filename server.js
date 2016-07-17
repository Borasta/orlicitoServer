var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('promise-mysql');

var socket = require('./api/socket');
var crossOrigin = require('./api/cross-origin');
var routes = require('./api/router');
var dbOptions = require("./api/db");
 
var router = express.Router();
var app = express();

app.set("port", 5000);

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + "/files/"));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(crossOrigin());

var http = app.listen(app.get("port"), function () {
	console.log(`Server iniciado en http://localhost:${app.get("port")}/`);
});

mysql.createConnection(dbOptions.externa)
	.then(function(conn){
		console.log("Conexion con la base de datos correcta");
		var io = socket(http);
		app.use(routes(router, conn, io));
	});