const express = require("express");
const router = express.Router();
const request = require('request');

const Movies = require("../models/movies");





router.get('/pick', (req,res) => {
	request('https://api.themoviedb.org/3/genre/movie/list?api_key=32d3d0cbaf9018e6f6e161c4581015e6&language=en-US', (error, response, body) => {
  	if(error){
  		console.log(error)
  	} else {
	var genreObj = JSON.parse(body);
	console.log(genreObj)
	res.render('movieSelector/home.ejs', {
		genreSelect:genreObj
	});
}
})
})

router.get("/", (req, res) => {
	Movies.find({}, (err, allMovies) => {
		if(err){
			console.log(err)
			res.send(err)
		} else {
			res.render("movieSelector/home.ejs")
		}
	})
});

module.exports=router;