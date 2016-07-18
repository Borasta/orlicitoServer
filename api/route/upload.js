var jwt = require("jwt-simple");
var jwtConfig = require("../secret");

var querys = require("../querys");
var validated = require("../validated");
var extString = require("../ext-tring");
var fs = require("fs.extra");
var uniqid = require("uniqid");

module.exports = function(db) {

    return {
        "get": function (req, res) {

        },
        "post": function (req, res) {

            console.log(req.body);

            console.log(req.file);

            var serverPath = __dirname + "/../../";

            var tempPath = serverPath + "/temp/";
            var tempFile = tempPath + "/" + req.file.filename;
            var filesPath = serverPath + "/files/media/";
            var userPath = filesPath + "/" + req.user.username;

            var mimetype = req.file.mimetype.split("/");
            var media = uniqid();
            var mediaType = mimetype[0];

            switch( mediaType ) {
                case "image":
                    media += ".png";
                    break;
                case "audio":
                    media += ".mp3";
                    break;
                case "video":
                    media += ".mp4";
                    break;
                default:
                    throw "Existe un proble con el archivo";
            }

            var finalFile = userPath + "/" + media;
            var location = Number(req.body.latitude) + "," + Number(req.body.longitude);
            var dateTime = new Date();

            fs.mkdirp(userPath, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('pow!');
                    fs.move(tempFile, finalFile, function (err) {
                        if (err) throw err;
                        console.log("Moved 'a' to 'b'");
                    });
                }
            });

            var params = validated([
                req.user.id,
                req.body.title ? extString.capitalize(req.body.title) : null,
                media.split(".")[0],
                mediaType,
                location,
                req.body.description ? req.body.description : null,
                dateTime
            ]);

            if(params)
                db.query(querys.upload, params)
                    .then(function(row){
                        var resp = {
                            "url": media
                        };
                        res
                            .status(200)
                            .send(resp);
                    }).catch(function(error){
                        //logs out the error
                        console.log(error);
                        fs.rmrf(finalFile, function (err) {
                            if (err) {
                                console.error(err);
                            }
                        });
                        res
                            .status(400)
                            .send("No se pudo subir su archivo");
                    });
            else {
                fs.rmrf(finalFile, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                res
                    .status(400)
                    .send("Faltan parametros");
            }

        },
        "put": function (req, res) {

        },
        "delete": function (req, res) {

        }
    }
};