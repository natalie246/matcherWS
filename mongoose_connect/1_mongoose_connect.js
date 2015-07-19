var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://db_usr:db_pass@ds031751.mongolab.com:31751/friends_list');
var userSchema = require('./schema_user').userSchema;
var User = mongoose.model('UserM', userSchema);

// var query = User.find();
// query.where(newUser.data.id);
// query.exec(function(err, user){
//   if(!user){
   
 
var addUser = function(newUser){ //newUser is a fb object 
var myNewUser = [];
var theUserExist = null;
    for(var i=0; i<newUser.data.length; i++)
    {
              if(newUser.data[i].gender != null)
            {
              //console.log(myNewUser);
                myNewUser[i] = new User({name:newUser.data[i].name,
                                        id:newUser.data[i].id,
                                        gender:newUser.data[i].gender,
                                        picture:newUser.data[i].picture.data.url,
                                        age: "22",
                                        location: "Ramat-Gan",
                                        education: "Shenkar"
                                    });

                myNewUser[i].save(function (err, doc) {
                      if(err){
                          if(err.code == 11000){
                              console.log('duplicate');
                          }  
                      }
                      else{
                          // console.log('doc',doc);
                      }
                });
            } 
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
