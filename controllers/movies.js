const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();

const Movies = require("../models/movies");

///////////////////INSERT USING MONGOOSE///////////////
////////////////### Add the movies data /////////////

// const MoviesCollection = require("../populateMovies")

// Movies.collection.insertMany(MoviesCollection, (err, data) => {
//     console.log("added provided movie data")
//     mongoose.connection.close();
// });

////////////////COMMENT OUT AFTER USE!!!!/////////////



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
});


router.put("/:id", (req, res) =>{

	Movies.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedMovie) =>{
		if (err){
			console.log(error, "error")
			res.send(error)
		} else {
			res.redirect("/movies")
		}	
	})	

})

router.delete("/:id", (req, res) => {
	Movies.findByIdAndRemove(req.params.id, (err, removedMovie) => {
		if (err){
			console.log(err)
			res.send(err)
		} else {
			res.redirect("/movies")
		}
	})
})



module.exports = router