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

router.get("/:id/edit", (req, res) => {

	Movies.findById(req.params.id, (err, foundMovie) => {

		if(err){
			console.log(err)
			res.send(err)

		} else {

			res.render("movies/edit.ejs", {

				movie: foundMovie

			})

		}

	})
})


router.get("/:id", (req, res) => {
	
	Movies.findById(req.params.id, (err, foundMovie) =>{
		if (err){

			res.send(err)
		
		} else {

			res.render("movies/show.ejs", {
			
				movie: foundMovie

			});
		}
	});
});




router.post("/", async (req, res) => {
	try{

		const createMovie = await Movies.create(req.body);

		res.redirect("/movies")

	} catch (err){
		
		res.send(err)
	
	}
})

module.exports = router