///requiring needed npm and files/////////////////////// 

const express 				= require('express');
const app 					= express();
const bodyParser 			= require('body-parser');
const methodOverride 		= require('method-override');
const passport 				= require("passport")
const session 				= require("express-session")
const GoogleStrategy 		= require("passport-google-oauth").OAuthStrategy;
const LocalStrategy			= require("passport-local").Strategy
const passportLocalMongoose = require("passport-local-mongoose")
const flash					= require("connect-flash")
const cookieParser 			= require("cookie-parser")

////require database, .env and passport
require('./db/db.js');
require("dotenv").config();

///////setup sessions
app.use(session({
	secret: "atomic cowboy donkey farts",
	resave: false,
	saveUnitialized: false,
}));

//////////////passport middleware//////////////////
app.use(passport.initialize());

app.use(passport.session()); //persistent login sessions

app.use(flash()); //use connect-flash for flash messages stored in session (possibly send error messagees to user)

// passport.use(new LocalStrategy(User.authenticate()));

//set up our express application/////////////////
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));
app.use(cookieParser());


//set up controllers and add them as middleware/////////
const authController 			= require('./controllers/auth.js')
	// (app, passport); //adds passport to authController
const moviesController 			= require("./controllers/movies.js");
const usersController 			= require("./controllers/users.js");
const movieSelectorController 	= require("./controllers/movieSelector.js")

app.use("/auth", authController);
app.use("/movies", moviesController);
app.use("/users",  usersController);
app.use("/selector", movieSelectorController);

/////passport to auth router///////

// require passport config files =======
require("./passport/local-config");
require("./passport/google-config");
require("./passport/serializing");

//router to index//////////////////////////////////////

app.get('/', (req,res) => {
	res.render('index.ejs');
});



////set up launch///////////////////////////////////

app.listen(3000, () => {
	console.log('proj2 is listening on 3000');
});