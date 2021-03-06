module.exports = {
	"login": `
		SELECT  
			id_user AS id,
			username,
			name,
			lastname
		FROM users 
		WHERE username = ? 
		AND password = ?
	`,
	"signup": `
		INSERT INTO users (
			name,
			lastname,
			email,
			username,
			password
		) VALUES (
			?,
			?,
			?,
			?,
			?
		)
	`,
	"upload": `
		INSERT INTO publishs (
			id_user,
			title,
			media,
			media_type,
			location,
			description,
			date_time
		) VALUES (
			?,
			?,
			?,
			?,
			?,
			?,
			?
		)
	`,
	"userPublish": `
		SELECT
			publishs.id_publish,
			title,
			media,
			media_type,
			location,
			description,
			date_time,
			username
		FROM publishs 
		  INNER JOIN users
			ON publishs.id_user = users.id_user
		WHERE username = ? 
		ORDER BY id_publish DESC;
	`,
	"publish": `
		SELECT
			publishs.id_publish,
			title,
			media,
			media_type,
			location,
			description,
			date_time,
			username
		FROM publishs 
		  INNER JOIN users
			ON publishs.id_user = users.id_user
		ORDER BY id_publish DESC;
	`,
	"media": `
		SELECT  
			media,
			media_type
		FROM publishs 
		  INNER JOIN users
			ON publishs.id_user = users.id_user
		WHERE username = ? 
		AND media = ?
	`,
	"findLike": `
		SELECT 
			*
		FROM likes 
		WHERE 
			id_user = ?
			AND id_publish = ?
		  
	`,
	"createLike": `
		INSERT INTO 
			likes (
				id_user, 
				id_publish,
				liked
			) VALUES (
				?,
				?,
				?
			)
	`,
	"updateLike": `
		UPDATE 
			likes 
			SET liked = ?
		WHERE 
			id_user = ?
			AND id_publish = ?;
	`,
	"findComment": `
		SELECT 
			username,
			name,
			lastname,
			comment
		FROM comments
		  INNER JOIN users
		  	ON comments.id_user = users.id_user
		  INNER JOIN publishs
		  	ON comments.id_publish = publishs.id_publish
		WHERE publishs.id_publish = ?;
	`,
	"createComment": `
		INSERT INTO 
			comments (
				id_user, 
				id_publish,
				comment
			) VALUES (
				?,
				?,
				?
			)
	`,
	"profilePublish": `
		SELECT 
			username,
			title
		FROM publishs
		  INNER JOIN users
		  	ON publishs.id_user = users.id_user
		WHERE id_publish = ?
	`,
	"profileComment": `
		SELECT 
			username,
			title
		FROM comments
		  INNER JOIN users
		  	ON publishs.id_user = users.id_user
		  INNER JOIN publishs
		WHERE publishs.id_publish = ?
	`
};