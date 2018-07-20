const express = require ("express");
const router = express.Router;

// const User = ("../models/users")

router.get("/", (req, res) =>{
		res.render("auth/login.ejs",{
			message: req.session.message
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

				req.session.message = "Incorrect username or password";
				res.redirect("/auth")

			}
		} else {

			req.session.message = "Incorrect username or password";
			res.redirect("auth")

	};
	} catch(err){
		res.send(err);
	}

});

router.post("/register", async(req, res) =>{

	try{

		const password = req.body.password
		const passwordHash = bcrypt.hasSync(password, bcrypt.genSaltSync(10));

		const userDbEntry = {};
		userDbEntry.username = req.body.username;
		userDbEntry.password = passwordHash;

		const user = await User.create(userDbEntry);

		req.session.username = user.username;
		req.session.loggedIn = true;
		res.redirect("/")		

	} catch(err){
		res.send(err);
	}
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

