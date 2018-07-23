const mongoose = require("mongoose");
const preferencesSchema = new mongoose.Schema({
	genre: String,
	director: String,
	favoriteMovie: String,
	favoriteActor: String,
})


module.exports = mongoose.model("Preference", preferencesSchema)