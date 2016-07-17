var querys = require("../querys");
var validated = require("../validated");

module.exports = function(db) {

    return {
        "get": function (req, res) {
            var params = validated([
                req.query.username
            ]);

            if(params)
                db.query(querys.userPublish, params)
                    .then(function(row){
                        res
                            .status(200)
                            .send(row);
                    }).catch(function(error){
                    //logs out the error
                    console.log(error);
                    res
                        .status(400)
                        .send("No se pudieron encontrar sus publicaciones");
                });
            else {
                db.query(querys.publish, params)
                    .then(function(row){
                        res
                            .status(200)
                            .send(row);
                    }).catch(function(error){
                    //logs out the error
                    console.log(error);
                    res
                        .status(400)
                        .send("No se pudieron encontrar sus publicaciones");
                });
            }
        },
        "post": function (req, res) {

        },
        "put": function (req, res) {

        },
        "delete": function (req, res) {

        }
    }
};