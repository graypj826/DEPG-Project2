const express = require ("express");
const router = express.Router();
const bcrypt = require("bcrypt")

const User = require("../models/users")

// const User = ("../models/users")

router.get("/", (req, res) =>{
		res.render("auth/login.ejs",{
			// message: req.session.message
		});
});

router.post("/login", (req, res) =>{
		User.findOne({username: req.body.username}, (err, user) => {
			
			if(err){ //if check 1
				
				res.send(err)

			} else { //if check 1

				console.log(user)

				if (user){ //function 1
					
					if(err){ //if check 2
					
						res.send(err)
					
					} else { //if check 2

						if(bcrypt.compareSync(req.body.password, user.password)){ //function 2
							
							if (err) { //if check 3

								res.send(err)
							
							} else{ //if check 3
							
								// req.session.username = user.username;
							
								// req.session.loggedIn = true;

								res.send("loggedin!")
							}
							
						} else { //function 2

							if(err) { //if check 4

								res.send(err)

							} else { //if check 4
							
								// req.session.message = "Incorrect username or password";
								res.send("incorrect username password")

							};
						}
					}

				} else { //function 1

					// req.session.message = "Incorrect username or password";
					res.send("not a user")
				};

			};
		});		
});

router.post("/register", (req, res) =>{

		const password = req.body.password;
		const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		const userDbEntry =  {};

		userDbEntry.username = req.body.username;
		userDbEntry.email = req.body.email;
		userDbEntry.password = passwordHash;

		User.create(userDbEntry, (err, createdUser) => {
	
			if(err){
				console.log(err)
				res.send(err)
			} else {
				// req.session.username = createdUser.username;
				// req.session.loggedIn = true;	
				res.send("success")
			}
		});	

});

router.get("/logout", async (req, res) => {
	req.session.destroy((err) => {
		if(err){
			res.send("error destroying session");	
		} else {
			res.redirect("/auth")
		}
	})
})



module.exports = router;

