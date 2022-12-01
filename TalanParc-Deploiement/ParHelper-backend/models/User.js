var mongoose=require('mongoose');
var UserCar=require('../models/UserCar');
var validator = require('validator');


var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
     email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
          validator: function(email) {
            return /^[a-zA-Z]+\.[a-zA-Z]+(-[a-zA-Z]+)*@talan\.com$/.test(email);
          },
          message: " is not a valid email!"
        },
        required: [true, 'User email required']
  },
    
    address : {type : String},
    password: {
        type: String,
        trim: true,
        //validate: {
        //    validator: function(password) {
        //      return  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\.\,\;\:A-Za-z\dàâäéèêëìîïòôöùûü@$!'"()=+*%#?&^_-]{8,30}$/.test(password);
        //    },
        //    message: " is not a valid password!"  
        //  },
          required: [true, 'password is required']
       
    },
    telephone:{
        type: String,
        validate : [validator.isNumeric, 'telephone may only have numbers.']
    },
    confirmMail:{type: Boolean, default : false},
    role:{type:String, default : 'user'}
},{collection : "userCollection"});

module.exports=mongoose.model("User",userSchema);
