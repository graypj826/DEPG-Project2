const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
  password: String
})

const userSchema = mongoose.model("User", userSchema);

module.exports = userSchema;