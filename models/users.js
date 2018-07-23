const mongoose = require('mongoose');
const Preferences = require("./preferences");
const Movies = require("./movies")

const userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
  	password: String,
  	profilePic: String,
  	favoriteGenre: String,
	favoriteDirector: String,
	favoriteMovie: String,
	favoriteActor: String,
	moviesCreated: [Movies.schema],
  	moviesHistory: []
});




module.exports = mongoose.model("User", userSchema);
