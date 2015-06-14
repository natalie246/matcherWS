var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
	name: {type: String, index:1, required:true, unique:true},
	id: Number,
	gender: {type:String, required:true},
	picture:{type:String, required:true}
}, {collection: 'facebook_friends_list'});

exports.userSchema = userSchema;