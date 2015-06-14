var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://db_usr:db_pass@ds031751.mongolab.com:31751/friends_list');
var userSchema = require('./schema_user').userSchema;
var User = mongoose.model('UserM', userSchema);



//var girls = null;
//var boys = null;

var addUser = function(newUser){

  var myNewUser = [];

  console.log('myNewUser -',myNewUser);
    for(var i=0; i<newUser.data.length; i++)
    {
        if(newUser.data[i].gender != null)
        {
            myNewUser[i] = new User({   name:newUser.data[i].name,
                                    id:newUser.data[i].id,
                                    gender:newUser.data[i].gender,
                                    picture:newUser.data[i].picture.data.url
                                });

            myNewUser[i].save(function (err, doc) {
              if(err){
                if(err.code == 11000){
                  console.log('duplicate');
                }  
              }
              else{
                console.log('doc',doc);
              }
            });
        }
    }

}; 
         
function updateGirls(callback)
{
  var girls = [];
  var query_female = User.find().where('gender','female');
  query_female.exec(function(err,female_result)
  {
    for(var i in female_result){
      girls[i] = female_result[i].name;
    }
    callback(girls);   
  });
}



  function updateBoys(callback)
{
  var boys = [];
  var query_male = User.find().where('gender','male');
  query_male.exec(function(err,male_result)
  {
for(var i in male_result){
    boys[i] = male_result[i].name;
    }    callback(boys); 
  });
}
  

exports.addUser = addUser;
exports.updateGirls = updateGirls;
exports.updateBoys = updateBoys;



/////////////////////////////////////////////////////////////////////////////////////////////
