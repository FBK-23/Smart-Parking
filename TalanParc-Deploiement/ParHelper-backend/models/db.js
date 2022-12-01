var mongoose=require('mongoose');
var bcrypt = require('bcrypt');
const User = require('./User');
var path = require("path");
const Car = require('./Car');
const homedir = require('os').homedir();
//const userDir= path.join(homedir,"Talanparkhelper-config/back-config.js")
const userDir= "../utils/back-config.js"
let environment = require(userDir)

console.log("path",'mongodb://'+`${environment.DB_USERNAME}`+':'+`${environment.DB_PASSWORD}`+'@'+
`${environment.DB_PATH}`+':'+`${environment.DB_PORT}`+'/'+`${environment.DB_NAME}`+'?authSource=admin');

/*mongoose.connect('mongodb://'+`${environment.DB_USERNAME}`+':'+`${environment.DB_PASSWORD}`+'@'+`${environment.DB_PATH}`+':'+`${environment.DB_PORT}`+'/'+`${environment.DB_NAME}`+'?authSource=admin',function (err,result) {
//mongoose.connect('mongodb://hamaca:ca04111920@ds247058.mlab.com:47058/smartunis',function (err,result) {
//mongoose.connect("mongodb+srv://hamaca:ca04111920@parkingmanagement-fdxm8.mongodb.net/test?retryWrites=true&w=majority",function (err,result) {
    if(err){
        return console.log(err);
    }
  return console.log("succesfully connected");

});*/
mongoose.connect(

  'mongodb://localhost:27017/talanParking',
 
   { useNewUrlParser: true,
     useUnifiedTopology: true,
   },(err)=>{
     if(err){
         console.log(err)
     }
     else{
         console.log("successfully connected")
     }
   }
 );

var db = mongoose.connection;
db.once('open', function() {
    console.log("Connection Successful!");
    
    var pass =  bcrypt.hashSync("aA123456",bcrypt.genSaltSync(10));
    //// a document instance
    var user = new User({firstName: "firas", lastName: "admin" , email : "firas.admin@talan.com", address : " Bloc A" , password :pass ,telephone: "70100200" , confirmMail : true,role : "admin"});
    
 //
    //// save model to database
    user.save(function (err, user) {
      if (err) return console.error(err);
      console.log(" saved to user collection.");
    });
    //car.save(function (err, user) {
    //  if (err) return console.error(err);
    //  console.log(" saved to car collection.");
    //});
    // 
});
module.exports=mongoose;
