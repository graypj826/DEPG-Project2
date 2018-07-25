const express = require ("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const passport = require('passport')

/// ========= Middleware To Check In =============///

function isLoggedIn(req, res, next){

	if (req.isAuthenticated())

		return next();

	res.redirect("/");
}

// ==== export 

module.exports = router;
