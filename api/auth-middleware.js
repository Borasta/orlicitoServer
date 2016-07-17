var jwt = require("jwt-simple");
var jwtConfig = require("./secret");

module.exports = function(req, res, next) {

	var token = req.headers.authorization;

	var decoded = null;

	if( !token )
		return res
			.status(403)
			.send("Tu peticion no tiene cabezera de autentificacion");
	else {
		try {
			decoded = jwt.decode(token, jwtConfig.secret);
		} catch(e) {
			console.log(e);
		}
	}

	if( !decoded ) {
		return res
			.status(401)
			.send("El token no es valido, autentifiquese de nuevo");
	}

	req.user = decoded;
	next();

};