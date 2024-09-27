const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

//todo: configure knex to connect to postgres database and assign it to the variable db
const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1", //localhost
		user: "postgres", //add your user name for the database here
		port: 5432, // add your port number here
		password: "50239812", //add your correct password in here
		database: "smart_brain", //add your database name you created here
	},
});

// db.select("*")
// 	.from("users")
// 	.then((data) => console.log(data));

//todo: create express object
const app = express();

//todo: add middleware cors and express.json() to parse the body of the request and make it readable by the server. cors is used to allow cross origin requests. used for development purposes only
app.use(express.json()); // to parse the body of the request
app.use(cors()); // to allow cross origin resource sharing

//todo: display the user table in route
//! for debugging purposes ONLY !!, do not include in production
app.get("/", (req, res) => {
	db.select("*")
		.from("users")
		.then((data) => {
			res.json(data);
		});
});

//todo: /signin -> post = sucess/fail
//! databases are important since if the server gets run again, we lose the data we sent with post since the user variable at the top of the file is reset.
app.post("/signin", (req, res) => {
	db.select("email", "hash")
		.from("login")
		.where("email", "=", req.body.email)
		.then((loginDetails) => {
			const isValid = bcrypt.compareSync(
				req.body.password,
				loginDetails[0].hash
			);
			if (isValid) {
				return (
					db
						.select("*")
						//use return when using database within a databas
						.from("users")
						.where("email", "=", req.body.email)
						.then((user) => {
							res.json(user[0]);
						})
						.catch((err) => res.status(400).json("unable to get user"))
				);
			} else {
				res.status(400).json("wrong credentials");
			}
		})
		.catch((err) => res.status(400).json("wrong credentials"));
});

//todo: /register -> post = return user
app.post("/register", (req, res) => {
	const { email, name, password } = req.body;
	if (email.length == 0 || password.length == 0 || name.length == 0) {
    return res.status(400).json("your username or password or name or al three are empty");
	}
	const hash = bcrypt.hashSync(password);
	db.transaction((trx) => {
		trx
			.insert({
				hash: hash,
				email: email,
			})
			.into("login")
			.returning("email")
			.then((loginEmail) => {
				return trx("users")
					.returning("*") //returning the user
					.insert({
						email: loginEmail[0].email, //returns an array of objects: [{email: "email"}]
						name: name,
						joined: new Date(),
					})
					.then((user) => {
						res.json(user[0]); // use indexing because user is stored in a list
					})
					.catch((err) => res.status(400).json("unable to register"));
			})
			.then(trx.commit)
			.catch(trx.rollback);
	}).catch((err) => res.status(400).json("unable to register"));
});

//todo: /profile/:id -> get = user
app.get("/profile/:id", (req, res) => {
	const { id } = req.params;

	db.select("*")
		.from("users")
		.where({ id })
		.then((user) => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json("not found");
			}
		});
	// cannot use .catch() here to catch any errors because the .then() returns an empty array even when no user is present. It doesn't actually throw any error.
});

//todo: /image -> put -> user
app.put("/image", (req, res) => {
	const { id } = req.body;
	db("users")
		.where("id", "=", id) //find the user with the id
		.increment("score", 1) //increment the score by 1
		.returning("score") //return the score of the user into the database
		.then((score) => {
			// catch error this way because .then() returns an empty array even when no user is present. It doesn't actually throw any error.
			if (score.length) {
				res.json(score[0]);
			} else {
				res.status(400).json("user has no score");
			}
		}) //use indexing because score is stored in a list; return to the font end. Following error is when the database itself is non-existent or disconnected
		.catch((err) => res.status(400).json("connection failed"));
});

//todo: assign a port to the server and cosnole a message if the server is running.
app.listen(8080, () => {
	console.log("Server is running on port 8080", new Date());
});
