var jwt = require("jwt-simple");
var jwtConfig = require("../secret");

var querys = require("../querys");
var validated = require("../validated");

module.exports = function(db) {

    return {
        "get": function (req, res) {

        },
        "post": function (req, res) {
            var passEncode = req.body.password ? jwt.encode(req.body.password, jwtConfig.secret) : null;

            var params = validated([
                req.body.username ? req.body.username.toLocaleLowerCase() : null,
                passEncode
            ]);

            if(params)
                db.query(querys.login, params)
                    .then(function(row){
                        var payload = {
                            "id": row[0].id,
                            "username": row[0].username
                        };
                        var resp = {
                            "token": jwt.encode(payload, jwtConfig.secret),
                            "username": row[0].username,
                            "name": row[0].name,
                            "lastname": row[0].lastname
                        };
                        res
                            .status(200)
                            .send(resp);
                    }).catch(function(error){
                        //logs out the error
                        console.log(error);
                        res
                            .status(400)
                            .send("Error con las credenciales introducidas");
                    });
            else
                res
                    .status(400)
                    .send("Faltan parametros");

        },
        "put": function (req, res) {

        },
        "delete": function (req, res) {

        }
    }
};