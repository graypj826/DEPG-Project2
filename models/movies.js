const mongoose = require ("mongoose");

const moviesSchema = new mongoose.Schema({

	title : {type: String, required: true},
	genre : [],
	poster : String,
	stars : [],
	director : String,
	rating: String,


});


module.exports = mongoose.model("Movie", moviesSchema);