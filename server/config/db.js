const mongoose = require('mongoose');
const url = 'mongodb://localhost/wcx2020';
const db = mongoose.connection;
module.exports = {
  db
}

db.on('connected', function(err){
	if(err){
		console.log('数据库连接失败' + err);
	}else{
		console.log('数据库成功连接到 :' + url);
	}
})
