var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
	name: {type: String, index:1, unique:true,required:true},
	id: {type: Number, unique:true,required:true},
	gender: {type:String, required:true},
	picture:{type:String, required:true},
	age:{type:Number, required:true},
	location:{type:String, required:true},
	education:{type:String, required:true}
}, {collection: 'facebook_friends_list'});

exports.userSchema = userSchema;