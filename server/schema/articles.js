const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({
	id: String,
	title:String,
    update_time:String  
})
module.exports = articleSchema
