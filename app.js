var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var add_User = require('./mongoose_connect/1_mongoose_connect.js');
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
	add_User.addUser(req.body);
	res.send('s');
});


app.get('/girls',function (req,res){ 
	add_User.updateGirls(function(girlList){
		girls = girlList;
		res.json(girls);
	});
});


app.get('/boys',function (req,res){ 
	add_User.updateBoys(function(boyList){
		boys = boyList;
		res.json(boys);
	});
});

var port =process.env.PORT || 3000;
app.listen(port); 
console.log("listening on port " + port +"\n");
