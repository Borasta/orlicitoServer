var querys = require("../querys");
var validated = require("../validated");

module.exports = function(db, io) {

    return {
        "get": function (req, res) {
            var params = validated([
                req.user.id,
                req.body.id_publish
            ]);

            console.log("hola, si entre")

            if( params )
                db.query(querys.findLike, params)
                    .then(function(row){
                        console.log(row)
                        if( row.length ) {
                            res
                                .status(200)
                                .send(row[0].liked.toString());
                        }
                        else {
                            res
                                .status(200)
                                .send("0");
                        }
                    }).catch(function(error){
                        //logs out the error
                        console.log(error);
                        res
                            .status(400)
                            .send("Hubo un problema al buscar el estado del like");
                    });
            else
                res
                    .status(400)
                    .send("Faltan parametros");
        },
        "post": function (req, res) {
            console.log(req.body);
            var params = validated([
                req.user.id,
                req.body.id_publish
            ]);

            params.push(req.body.liked);

            if( params ) {
                db.query(querys.profilePublish, params[1])
                    .then(function(row) {
                        if( req.body.liked )
                            io.emit(row[0].username, {
                                "type": "like",
                                "msg": "El usuario \"" + req.user.username + "\" le ha dado me gusta a tu publicacion \"" + row[0].title + "\"."
                            });
                        db.query(querys.findLike, params)
                            .then(function(row){
                                if( row.length ) {
                                    params = [
                                        req.body.liked,
                                        req.user.id,
                                        req.body.id_publish
                                    ];
                                    db.query(querys.updateLike, params)
                                        .then(function(row) {
                                            res
                                                .status(200)
                                                .send(req.body.liked.toString());
                                        }).catch(function(error) {
                                        //logs out the error
                                        console.log(error);
                                        res
                                            .status(400)
                                            .send("No se pudo modificar el like");
                                    });
                                }
                                else {
                                    params = validated([
                                        req.user.id,
                                        req.body.id_publish,
                                        req.body.liked
                                    ]);
                                    db.query(querys.createLike, params)
                                        .then(function(row) {
                                            res
                                                .status(200)
                                                .send(req.body.liked.toString());
                                        }).catch(function(error) {
                                        //logs out the error
                                        console.log(error);
                                        res
                                            .status(400)
                                            .send("No se pudo crear el like");
                                    });
                                }
                            }).catch(function(error){
                            //logs out the error
                            console.log(error);
                            res
                                .status(400)
                                .send("No se pudo manejar el like");
                        });
                    }).catch(function(error) {
                        console.log(error);
                        res
                            .status(400)
                            .send("Hubo un problema al buscar al creador de la publicacion");
                    });
            }
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