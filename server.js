///requiring needed npm and files/////////////////////// 

const express 				= require('express');
const app 					= express();
const bodyParser 			= require('body-parser');
const methodOverride 		= require('method-override');
const passport 				= require("passport")
const session 				= require("express-session")
const MongoDBStore 			= require("connect-mongodb-session")(session)
const GoogleStrategy 		= require("passport-google-oauth").OAuthStrategy;
const LocalStrategy			= require("passport-local").Strategy
const passportLocalMongoose = require("passport-local-mongoose")
const flash					= require("connect-flash")
const cookieParser 			= require("cookie-parser")
const assert        = require("assert");


////require database, .env and passport




const port = process.env.PORT || 3000


 
// const store = new MongoDBStore({
//   uri: process.env.MONGODB_URI,
//   collection: 'mySessions'
// });
 
// store.on('connected', function() {
//   store.client; // The underlying MongoClient object from the MongoDB driver
// });
 
// // Catch errors
// store.on('error', function(error) {
//   assert.ifError(error);
//   assert.ok(false);
// });

require('./db/db'); 

///////setup sessions
app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));

//////////////passport middleware//////////////////
app.use(passport.initialize());

app.use(passport.session()); //persistent login sessions

app.use((req, res, next)=>{
  res.locals.user = req.user;
  next();
});


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

app.get('/landing', (req,res) => {
  console.log(req.user.id, "this is the req.user.id")
	res.render('landingPage.ejs');
});



////set up launch///////////////////////////////////

app.listen(port);
console.log('---------------------------------');
console.log('Server running on port: ' + port);
console.log('---------------------------------');