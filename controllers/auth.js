const express = require ("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const passport = require('passport')

// const GoogleStrategy - require("passport-google-oauth.0Auth2Strategy")

const User = require("../models/users")


//google passport export

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

// const User = ("../models/users")


// // ===== LOCAL LOGIN ==============================//

         // // show local login page // //

router.get("/", (req, res) =>{
		res.render("auth/login.ejs",{
			message: req.flash("loginMessage")
		});
});

		// local login logic 
router.post("/login", passport.authenticate("local-login", {
	successRedirect : "/",
	failureRedirect : "/login",
	failureFlash : true 
}))

       // // processing Login  // //

// router.post("/login", (req, res) =>{
// 		User.findOne({username: req.body.username}, (err, user) => {
			
// 			if(err){ //if check 1
				
// 				res.send(err)

// 			} else { //if check 1

// 				if (user){ //function 1
					
// 					if(err){ //if check 2
					
// 						res.send(err)
					
// 					} else { //if check 2

// 						if(bcrypt.compareSync(req.body.password, user.password)){ //function 2
							
// 							if (err) { //if check 3

// 								res.send(err)
							
// 							} else{ //if check 3
							
// 								 //req.session.username = user.username;
							
// 								 //req.session.loggedIn = true;

// 								//res.send("loggedin!")
// 								res.redirect("/movies")
// 							}
							
// 						} else { //function 2

// 							if(err) { //if check 4

// 								res.send(err)

// 							} else { //if check 4
							
// 								// req.session.message = "Incorrect username or password";
// 								res.send("incorrect username password")

// 							};
// 						}
// 					}

// 				} else { //function 1

// 					// req.session.message = "Incorrect username or password";
// 					res.send("not a user")
// 				};

// 			};
// 		});		
// });

// ============= GOOGLE ROUTES ============//

// ==== send to google for authentication ==//

router.get("/auth/google", passport.authenticate("google", 
	{scope: ["profile", "email"]
}));

//=== callback after google has thumbsed up

router.get("/auth/google/callback",
	passport.authenticate("google",{
		successRedirect : "/show",
		failureRedirect : "/"
}));
	

	//========== Login ==========//

	// ===== login form =======//

	// ==== processing login form ===//





	//======== logging out =====//



// // ====== LOCAL REGISTER =========================//


   // // Register Form // // 
router.get("/register", (req,res) => {
	res.render("auth/register.ejs",{
		message: req.flash("registerMessage")
	});
});

   // // Processing Register Form // // 
router.post("/register", passport.authenticate("local-signup", {
		successRedirect : "/",
		failureRedirect : "/register",
		failureFlash : true 
	}));

	// }) (req, res) =>{
		// const password = req.body.password;
		// const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		// const userDbEntry =  {};

		// userDbEntry.username = req.body.username;
		// userDbEntry.email = req.body.email;
		// userDbEntry.password = passwordHash;

		// User.create(userDbEntry, (err, createdUser) => {
	
		// 	if(err){
		// 		console.log(err)
		// 		res.send(err)
		// 	} else {
		// 		// req.session.username = createdUser.username;
		// 		// req.session.loggedIn = true;	
		// 		res.send("success")
		// 	}
		// });	

// });


// // ======= Logout ======================//
router.get("/logout", async (req, res) => {
	req.session.destroy((err) => {
		if(err){
			res.send("error destroying session");	
		} else {
			//req.session.loggedIn = false;
			res.redirect("/auth")
		}
	})
})








module.exports = router;

