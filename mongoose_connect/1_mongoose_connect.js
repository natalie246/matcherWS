var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://db_usr:db_pass@ds031751.mongolab.com:31751/friends_list');
var userSchema = require('./schema_user').userSchema;
var User = mongoose.model('UserM', userSchema);



//var girls = null;
//var boys = null;

var addUser = function(newUser, callback){ //newUser is a fb object 

  var myNewUser = [];

  console.log('myNewUser -',myNewUser);
  var userSize = newUser;
  console.log('size -',userSize);
  //if(userSize.data){
// find by user_id of newUser and if user_id exists don't save!!!
// i'm not sure you need that for, couldn't find a reason for it. 
  //  for(var i=0; i<newUser.data.length; i++)
   // {
var query = User.find();
query.where(newUser.data.id);
query.exec(function(err, user){
  if(!user){
     if(newUser.data.gender != null)
        {
            myNewUser = new User({   name:newUser.data.name,
                                    id:newUser.data.id,
                                    gender:newUser.data.gender,
                                    picture:newUser.data.picture.data.url
                                });

            myNewUser.save(function (err, doc) {
              if(err){
                if(err.code == 11000){
                  console.log('duplicate');
                  callback(err); // if err addUser callback will return err and wont continue to next lines 
                }  
                if(doc)
                {
                callback(doc);
                }
              }
            
            });
        }

  }
})     
}; 
         
function updateGirls(callback)
{
  var girls = [];
  var query_female = User.find().where('gender','female');
  query_female.exec(function(err,female_result)
  {
    callback(female_result);   
  });
}



  function updateBoys(callback)
{
  var boys = [];
  var query_male = User.find().where('gender','male');
  query_male.exec(function(err,male_result)
  {
      callback(male_result); 
  });
}
  

exports.addUser = addUser;
exports.updateGirls = updateGirls;
exports.updateBoys = updateBoys;



/////////////////////////////////////////////////////////////////////////////////////////////
