const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	name: String,
	password: String
})
module.exports = {
	userSchema
}