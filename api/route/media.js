var jwt = require("jwt-simple");
var jwtConfig = require("../secret");

var querys = require("../querys");
var validated = require("../validated");
var extString = require("../ext-tring");
var fs = require("fs");
var path = require("path");

module.exports = function(db) {

    return {
        "get": function (req, res) {
            /*var filesPath = path.join(__dirname, "/../../") + "/files/media/";

            var params = validated([
                req.params.username,
                req.params.file
            ]);

            if( params )
                db.query(querys.media, params)
                    .then(function(row){
                        var url = path.join(filesPath, params[0], params[1]);
                        fs.open(url, function (a, b, c) {
                            console.log(a)
                            console.log(b)
                            console.log(c)
                            res.sendFile(url);
                        });
                    }).catch(function(error){
                        //logs out the error
                        console.log(error);
                        res
                            .status(400)
                            .send("No se encontro el archivo");
                    });
            else
                res
                    .status(400)
                    .send("Faltan parametros");*/
        },
        "post": function (req, res) {

        },
        "put": function (req, res) {

        },
        "delete": function (req, res) {

        }
    }
};