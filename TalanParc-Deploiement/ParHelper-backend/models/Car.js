var mongoose=require('mongoose');
var validator = require("validator")
var carSchema = mongoose.Schema({
    matricule : {
        type : String, 
        unique : true, 
        required : true
        },
    qrCode : {type : String},
    batiment : {type : String,
    },
    marque : {
        type : String,
    }
    
},{collection : "carCollection"});

module.exports=mongoose.model("Car",carSchema);
