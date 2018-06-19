// import {mongoose} from 'mongoose';
const mongoose = require("mongoose");
let pending = mongoose.connect('mongodb://localhost/wcx2020');
console.log('pending: ' + JSON.stringify(pending));
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we\'ve connected');
    let _schema = mongoose.Schema({
        name: String
    });
    let _model = mongoose.model('_model', _schema);
    let _examle1 = new _model({name: 'wcx'});
    let _examle2 = new _model({name: 'wry'});
    _examle1.save(function(err, _examle1){
        if (err) {
            return console.error(err);
        }
        else {
            console.log('保存成功');
        }
    },false)
    _examle2.save(function(err, _examle2){
        if (err) {
            return console.error(err);
        }
        else {
            console.log('保存成功');
        }
    })    
    _model.find(function(err, _models) {
        if(err) {
            return console.error(err);
        }
        console.log(_models);
    })
    _model.find({}, function(err, docs){
        let t = docs[0].name;
        console.log(t);
    }); 
});