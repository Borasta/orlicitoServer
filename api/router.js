var authMiddleware = require("./auth-middleware");
var multer  = require('multer')({ dest: 'temp/' });

module.exports = function( router, db, io ) {

	var login = require("./route/login")(db);
	var signup = require("./route/signup")(db);
	var upload = require("./route/upload")(db);
	var publish = require("./route/publish")(db);
	var media = require("./route/media")(db);
	var like = require("./route/like")(db, io);
	var comment = require("./route/comment")(db, io);

	router.route("/login")
	// .get(authMiddleware, login.get)
		.post(login.post);
	// .put(login.put)
	// .delete(login.delete);

	router.route("/signup")
	// .get(signup.get)
		.post(signup.post);
	// .put(signup.put)
	// .delete(signup.delete);

	router.route("/upload")
	// .get(upload.get)
		.post(authMiddleware, multer.single('file'), upload.post);
	// .put(upload.put)
	// .delete(upload.delete);

	router.route("/publish")
		.get(authMiddleware, publish.get);
	// .post(publish.post);
	// .put(publish.put)
	// .delete(publish.delete);

	// router.route("/media/:username/:file")
	// 	.get(authMiddleware, media.get);
	// .post(media.post);
	// .put(media.put)
	// .delete(media.delete);

	router.route("/like")
	// .get(like.get)
	.get(authMiddleware, function (req, res) {
		io.emit(req.user.username, "Hola cara de bola");
		res.send(null);
	})
		.post(authMiddleware, like.post);
	// .put(like.put)
	// .delete(like.delete);

	router.route("/comment")
		.get(authMiddleware, comment.get)
		.post(authMiddleware, comment.post);
	// .put(comment.put)
	// .delete(comment.delete);

	return router;
};