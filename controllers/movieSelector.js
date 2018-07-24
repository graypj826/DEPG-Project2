const express = require("express");
const router = express.Router();

const Movies = require("../models/movies");

router.get("/", (req, res) => {
	Movies.find({}, (err, allMovies) => {
		if(err){
			console.log(err)
			res.send("err")
		} else {
			res.render("movieSelector/home")
		}
	})
});

module.exports=router;