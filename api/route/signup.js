var jwt = require("jwt-simple");
var jwtConfig = require("../secret");

var querys = require("../querys");
var validated = require("../validated");
var extString = require("../ext-tring");

module.exports = function(db) {

    return {
        "get": function (req, res) {

        },
        "post": function (req, res) {

            var password = req.body.password1 === req.body.password2 ? req.body.password1 : "";
            var passEncode = password ? jwt.encode(password, jwtConfig.secret) : null;

            var params = validated([
                req.body.name ? extString.capitalize(req.body.name) : null,
                req.body.lastname ? extString.capitalize(req.body.lastname) : null,
                req.body.email ? req.body.email.toLocaleLowerCase() : null,
                req.body.username1 ? req.body.username1.toLocaleLowerCase() : null,
                passEncode
            ]);

            if(params)
                db.query(querys.signup, params)
                    .then(function(row){
                        var payload = {
                            "id": row.insertId,
                            "username": params[3]
                        };
                        var resp = {
                            "token": jwt.encode(payload, jwtConfig.secret),
                            "name": params[0],
                            "lastname": params[1]
                        };
                        res
                            .status(200)
                            .send(resp);
                    }).catch(function(error){
                        //logs out the error
                        console.log(error);
                        res
                            .status(400)
                            .send("Ya usted tiene una cuenta en nuestros servicios");
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