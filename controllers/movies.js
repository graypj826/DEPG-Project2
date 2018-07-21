const express = require("express");
const router = express.Router();

const Movies = require("../models/movies");

router.get("/", async (req, res) =>{
	try{

		const foundMovies = await Movies.find();

		res.render("movies/index.ejs", {
			movies : foundMovies
		});

	} catch (err) {

		res.send(err)
	
	}
});

router.get("/new", async (req, res) => {
	try{

		// const allUsers = await Users.find({});
		res.render("movies/new.ejs"
		// 	, {
		// 	users : allUsers,
		// }
		);

	} catch(err) {

		res.send(err)
	} 
});

router.post("/", async (req, res) => {
	try{

		const createMovie = await Movies.create(req.body);

		console.log(createMovie)

		res.redirect("/movies")

	} catch (err){
		console.log(err)
		res.send(err)
	}
})

// router.get("/:id", async (req, res) => {

// })

module.exports = router