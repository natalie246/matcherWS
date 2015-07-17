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


app.get('/',function (req,res){
	res.send("Welcome");
});


app.post('/user',function(req,res){
	//console.log("Im in app post");
	//console.log('req.body',req.body);
	add_User.addUser(req.body);
	//console.log(req.body);
	res.send('success');
});


app.get('/girls',function (req,res){ 
	app.set('json space',3);
	add_User.updateGirls(function(girlList){
		girls = girlList;
		res.json(girls);
	});
});


app.get('/boys',function (req,res){ 
	app.set('json space',3);
	add_User.updateBoys(function(boyList){
		boys = boyList;
		res.json(boys);
	});
});

app.get('/boysgirlsfilter',function (req,res){ 
    var urlPart= url.parse(req.url,true);
    console.log(urlPart);
    var query = urlPart.query;
    console.log("url query:" + query);
    console.log("!!!!!!!!!!!!! " + query.val1);
    
      console.log("!!!!!!!!!!!!! " + query.val2);

		res.json(query.val);
});



var port =process.env.PORT || 3000;
app.listen(port); 
console.log("listening on port " + port +"\n");
