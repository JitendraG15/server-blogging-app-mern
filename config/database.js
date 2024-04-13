const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

// Function for making connection with mongodb server
exports.connect = () => {
	mongoose
		.connect(MONGODB_URL)
		.then(console.log(`Server connected to database successfully!`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
