const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const findOrCreate = require("mongoose-findorcreate")
const Movies = require("./movies")


const userSchema = new mongoose.Schema({
	
	username	: {type: String, unique: true},
	email		: {type: String, unique: true},
  	password	: String,
  	googleId	: String,
	profilePic		: String,
  	favoriteGenre	: String,
	favoriteDirector: String,
	favoriteMovie	: String,
	favoriteActor	: String,
	moviesCreated	: [Movies.schema],
  	moviesHistory	: []
  	
});

// METHODS =======

//generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

//google find Or Create

userSchema.plugin(findOrCreate);

//create the model for users and expose it to our app
module.exports = mongoose.model("User", userSchema);
