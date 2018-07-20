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

router.post("/login", async (req, res) =>{
	try{
	const user = await User.findOne({username: req.body.username})
		if (user){
			if(bcrypt.compareSync(req.body.password, user.password)){
				req.session.username = user.username;
				req.session.loggedIn = true;

				res.redirect ("/index.ejs")
			} else {

				// req.session.message = "Incorrect username or password";
				res.redirect("/auth")

			}
		} else {

			// req.session.message = "Incorrect username or password";
			res.redirect("/auth")

	};
	} catch(err){
		res.send(err);
	}

});

router.post("/register", (req, res) =>{

		const password = req.body.password;
		const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		const userDbEntry =  {};

		userDbEntry.username = req.body.username;
		userDbEntry.email = req.body.email;
		userDbEntry.password = passwordHash;
		console.log("DADFADSF")
		User.create(userDbEntry, (err, createdUser) => {
			console.log(createdUser)
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

