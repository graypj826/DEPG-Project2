// require files we'll need

const LocalStrategy 	= require("passport-local").Strategy;
const GoogleStrategy 	= require("passport-google-oauth").OAuth2Strategy;

//load User model

const User 				= require("../models/users")

//export the function to the app

module.exports = function(passport){

	/// ==== passport Session setup

	passport.serializeUser(function(user, done){
		done(null, user.id)
	});

	passport.deserializeUser(function(id,done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	//======= Local Signup =======

	passport.use("local-signup", new LocalStrategy({

		usernameField : "email",
		passwordField : "password",
		passReqToCallback : true // 

	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({
				"local.email" : email
			}, function(err, user){
				if(err)
					return done(err);
				
				if(user){
					return done(null, false, req.flash("signupMessage", "that email is already taken."));
				} else {
					
					const newUser 			= 	new User();
					newUser.local.email 	= 	email;
					newUser.local.password 	= 	newUser.generateHash(password);

					newUser.save(function(err){
						if(err)
						
							throw err;

						return done(null, newUser);
					});
				};
			});
		}); 
	}));
	//============= Local Login ========///
	passport.use("local-login", new LocalStrategy({
		usernameField : 'email',
		passwordField : "password",
		passReqToCallback : true
	}, 
	function(req, email, password, done){
		User.findOne({"local.email": email}, function(err, user){
			if(err){
				return done(err);
				//if error return error
			}
			if(!user){
				return done(null, false, req.flash("loginMessage", "Username incorrect"));
				//if no user is found, return flash message that the username or password is wrong
			}
			if(!user.validPassword(password)){
				return done(null, false, req.flash("loginMessage", "Oops! Wrong password."))
				//if the user is found but the password doesn't match, return message ==> fix once fixed
			}
			return done(null, user);
		});
	}
	));
	// // ============== GOOGLE ===========///

	passport.use(new GoogleStrategy({
		clientID 		: process.env.oAuthKey,
		clientSecret 	: process.env.oAuthConsumerSecret,
		callbackURL		: process.env.oAuthCallback
	},
	function(token, refreshToken, profile,done){
		process.nextTick(function(){

			User.findOne({"google.id": profile.id}, function(err, user){
				if(err){
					return done(err);
					//if error return
				}
				if(user){
					return done(null, user);
					//if user, log them in

				} else {
					//if the user isnt in our database, create a new user
					const newUser = new User();

					//set all of the relevant information
					newUser.google.id = profile.id;
					newUser.google.token = token;
					newUser.google.name = profile.displayName;
					newUser.google.email = profile.emails[0].value;

					//save the user
					newUser.save(function(err){
						if(err){
							throw err; 	

						}
						return done(null, newUser);

					});
				}
			})
		})
	}))
}
