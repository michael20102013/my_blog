const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({
	id: String,
	title:String,
	update_time:String,
	content:String,
	title:String
})
module.exports = articleSchema
