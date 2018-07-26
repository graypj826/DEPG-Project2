const express = require("express");
const router = express.Router();

const Users = require("../models/users")

router.get("/", (req, res) => {
	Users.find({}, (err, foundUsers) =>{
		res.render("users/index.ejs", {
		users : foundUsers
		})
	});	
});

router.get("/edit", (req, res) => {
	console.log(req.user, "<===this is the req.user")
	Users.findById(req.user.id, (err, foundUser) =>{
		console.log(foundUser, "<===this is the foundUser")
		if(err){
			res.send(err)
		} else {
			res.render("users/edit.ejs", {
				user: foundUser
			})
		}
	})
});

router.get("/:id", (req, res) => {
	Users.findById(req.params.id, (err, foundUser) =>{
		if(err) {
			res.send(err)
		} else {
			res.render("users/show.ejs", {
				user : foundUser
			})
		}
	});
});




router.put("/:id", (req, res) => {
	Users.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
		if(err){
			console.log(err, "error")
			res.send(err)
		} else {
			console.log(updatedUser)
			res.render(`users/show.ejs`,{
				user:updatedUser
			})
		}
	});
});


router.delete("/:id", (req, res) => {
	Users.findByIdAndRemove(req.params.id, (err, removedUser) => {
		if(err){
			res.send(err)
		} else {
			console.log(removedUser)
			res.redirect("/users")
		}
	});
});




module.exports = router;



