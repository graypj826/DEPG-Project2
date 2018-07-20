const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: type},
	email: {type: String, required: true, unique: true},
  password: {type: String, required}
})