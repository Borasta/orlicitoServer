var querys = require("../querys");
var validated = require("../validated");

module.exports = function(db, io) {

    return {
        "get": function (req, res) {
            var params = validated([
                req.query.id_publish,
            ]);

            if( params )
                db.query(querys.findComment, params)
                    .then(function(row){
                        res
                            .status(200)
                            .send(row);
                    }).catch(function(error){
                        //logs out the error
                        console.log(error);
                        res
                            .status(400)
                            .send("Hubo un problema al buscar los comentarios");
                    });
            else
                res
                    .status(400)
                    .send("Faltan parametros");
        },
        "post": function (req, res) {
            var params = validated([
                req.user.id,
                req.body.id_publish,
                req.body.comment
            ]);

            if( params )
                db.query(querys.profilePublish, params[1])
                    .then(function (row) {
                        io.emit(row[0].username, {
                            "type": "comment",
                            "msg": "El usuario \"" + req.user.username + "\" ha escrito un comentario en tu publicacion \"" + row[0].title + "\"."
                        });
                        db.query(querys.createComment, params)
                            .then(function(row){
                                res
                                    .status(200)
                                    .send(req.body.comment);
                            }).catch(function(error){
                            //logs out the error
                            console.log(error);
                            res
                                .status(400)
                                .send("No se pudo crear el comentario");
                        });
                    }).catch(function(error) {
                        console.log(error);
                        res
                            .status(400)
                            .send("Hubo un problema al buscar al creador de la publicacion");
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