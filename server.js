const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('./db/db.js');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));

const authController = require('./controllers/auth.js');
const moviesController = require("./controllers/movies.js");
const usersController = require("./controllers/users.js");
const movieSelectorController = require("./controllers/movieSelector.js")

app.use("/auth", authController);
app.use("/movies", moviesController);
app.use("/users",  usersController);
app.use("/selector", movieSelectorController);

app.get('/', (req,res) => {
	res.render('index.ejs');
});


app.listen(3000, () => {
	console.log('proj2 is listening on 3000');
});