var mongoose=require('mongoose');
var User=require('./User');
var Car=require('./Car');
var userCarSchema = mongoose.Schema({
    Owner:{type:mongoose.Schema.ObjectId,
        required: true,
        ref:'User'
    },
    Car:{type:mongoose.Schema.ObjectId,
        required: true,
        ref:'Car'
    }


},{collection : "userCarCustom"});
userCarSchema.index({Owner: 1, Car: 1}, {unique: true});


module.exports=mongoose.model("UserCar",userCarSchema);
