var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var mongoose = require('./mongoose_connect/1_mongoose_connect.js');
var app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(process.cwd() + '/views'));
app.set('views',process.cwd() + '/views');

var boys;
var girls;


app.post('/user',function(req,res){
	console.log("Im in app post");
	//console.log('req.body',req.body);
	mongoose.addUser(req.body, function(err, doc){ // since we're using mongoose save which is async we must use
		// callback 
	
	if(err){
		res.status(400).send('something went wrong with saving new user!', err);
	}
	if(doc){
	
	res.status(200).send('saved user');
	
	}/*if(null){
	res.status(400).send('user does not conains property data');
	}*/

	});
	
});


app.get('/girls',function (req,res){ 
	mongoose.updateGirls(function(girlList){
		girls = girlList;
		res.json(girls);
	app.set('json space', 3);
	});
});


app.get('/boys',function (req,res){ 
	mongoose.updateBoys(function(boyList){
		boys = boyList;
		res.json(boys);
	});
});

// app.get('/boys_girls',function (req,res){ 
// 		add_User.updateGirls(function(girlList){
// 		girls = girlList;
// 		add_User.updateBoys(function(boyList){
// 		boys = boyList;
// 		res.send(boys + girls);
// 	});
// });
// });



app.listen(3000,function (){
	console.log('listen on 3000');
});
