const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const Movies = require("./movies")

const userSchema = new mongoose.Schema({
	// username		: {type: String, required: true, unique: true},
	local			: {
		email		: {type: String, required: true, unique: true},
  		password	: String,
	},
	google			:	{
		id			: String,
		token		: String,
		email		: String,
		name		: String,  
	},
 //  	profilePic		: String,
 //  	favoriteGenre	: String,
	// favoriteDirector: String,
	// favoriteMovie	: String,
	// favoriteActor	: String,
	// moviesCreated	: [Movies.schema],
 //  	moviesHistory	: []
});

// METHODS =======

//generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

//create the model for users and expose it to our app
module.exports = mongoose.model("User", userSchema);
