var request = require('request');
request('https://api.themoviedb.org/3/movie/354677?api_key=32d3d0cbaf9018e6f6e161c4581015e6&language=en-US', (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  if ((response && response.statusCode)!==404){
  console.log('body:', body); // Print the HTML for the Google homepage.

var pageObj = JSON.parse(body);
console.log(pageObj);
} else {
	console.log(`RESPONSE=${response}`);
	console.log(`RES.SC=${response.statusCode}`);
	console.log('There was no result for this ID');
}

});