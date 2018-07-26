var request = require('request');
var asciify = require('asciify-image');

var options = {
  fit:    'box',
  width:  50,
  height: 25
  
}



let quid = false;

while (quid !== true) {
	var randId=Math.floor((Math.random() * 522000) + 8);
	console.log(randId);

	request(`https://api.themoviedb.org/3/movie/${randId}?api_key=32d3d0cbaf9018e6f6e161c4581015e6&language=en-US`, (err, response, body) => {
		if (response.statusCode !== '404'){
			console.log('Parsing title from database..');
			var pageObj = JSON.parse(body);
			
  			
		} else if {
			(pageObj.adult !== true) {
			
		} else {
			
			console.log('IF statusCode:', response && response.statusCode);
			console.log(response && response.statusCode)

			console.log(pageObj);
			asciify(`http://image.tmdb.org/t/p/w45///${pageObj.poster_path}`, (err, asciified) => {
    		console.log(err || asciified);
    		console.log(`${pageObj.title}	${pageObj.tagline}	${pageObj.release_date}`);
    		quid = true;
		})
		}
		
		}
		
}		
		
   // Print the response status code if a response was received
   // Print the HTML for the Google homepage.

	

