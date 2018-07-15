const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wcx2020');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
const userSchema = mongoose.Schema({
	name:String,
	password:String
});
const modelTest = mongoose.model('modelTest', userSchema);
let data = new modelTest({
	name:'wcxTest'
});
// const unitiy = new modelTest(data);
data.save(function(err,docs){
	if(err){
		console.log(err)
	}
	else{
		console.log(docs)
	}
})
// modelTest.update({name:'wcxTest'},{$set:{name:'321'}},function(err,res){
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(res)
// 	}
// })