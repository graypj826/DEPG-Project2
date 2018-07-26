var request = require('request');
request('https://api.themoviedb.org/3/genre/movie/list?api_key=32d3d0cbaf9018e6f6e161c4581015e6&language=en-US', (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.


var genreObj = JSON.parse(body);
console.log(genreObj);

for (let i=0; i<genreObj.genres.length; i++){
	console.log(`Genre ID: ${genreObj.genres[i].id}		${genreObj.genres[i].name}`);
}

	res.render('movieSelector/home.ejs',
		selectGenre:genreObj
	)
});

