const express = require("express");
const router = express.Router();
const request = require('request');

const Movies = require("../models/movies");





router.get('/pick', (req,res) => {
	console.log('ROUTER STARTED');
	getRandomMovie();

	/*request('https://api.themoviedb.org/3/genre/movie/list?api_key=32d3d0cbaf9018e6f6e161c4581015e6&language=en-US', (error, response, body) => {
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
*/
function getRandomMovie() {
console.log('function started');
var randId = Math.floor((Math.random() * 522000) +8);
console.log(randId);

request(`https://api.themoviedb.org/3/movie/${randId}?api_key=32d3d0cbaf9018e6f6e161c4581015e6&language=en-US`, (err, response, body) => {
	console.log(response.statusCode);
	if (response.statusCode !== 404) {
		console.log('Parsing data..');
		var dataObj = JSON.parse(body);
		//console.log(dataObj);
		console.log(dataObj.adult);
		console.log(dataObj.original_language);
		if (dataObj.original_language === 'en'){
		if (dataObj.adult !== true){
			console.log('TITLE VALID');
			for(let i=0;i<dataObj.genres.length;i++){
				console.log(dataObj.genres[i])
				console.log('GENRE '+ i); 
			}
			if (dataObj.poster_path !== null){
				console.log(`http://image.tmdb.org/t/p/w500///${dataObj.poster_path}`);
			} else {
				console.log('NO IMAGE')
			}
			console.log(dataObj.title);
		} else {
		console.log('INVALID TITLE');
		getRandomMovie();
		return;
		}
		console.log(dataObj.spoken_languages);
		} else {
		console.log('INVALID REGION');
		getRandomMovie();
		return;
	}
	console.log(dataObj.release_date);
	console.log(dataObj);

	res.render('movieSelector/hbo.ejs', {
		movieSelected:dataObj
	})

	} else {
	console.log('INVALID QUERY randId ', randId);
	getRandomMovie();
	return;
}


})}})

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