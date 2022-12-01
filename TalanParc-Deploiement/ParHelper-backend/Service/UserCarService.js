var UserCar=require('../models/UserCar');
var Car=require('../models/Car');
var errors = require ("../utils/errorHelper")
var nodemailer = require('nodemailer');
let environment = require("../utils/back-config");


async function addUserCars(UserCarinfo,res) {
    try {
        var userCar= new UserCar(UserCarinfo);
        let data = await userCar.save();
        return data
    } catch(err) {
        if(err.name === 'ValidationError') return err = errors.handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}

async function getUserCars(res) {
    try {
        let data = await UserCar.find().populate('Owner Car', '-password -__v');
        return data;
    } catch(err) {
        if(err.name === 'ValidationError') return err = errors.handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}



async function getCarsByUser(id,res) {
    try {
        let data = await UserCar.find({'Owner' : id}).populate('Owner Car', '-password -__v')
        return data;
    } catch(err) {
        if(err.name === 'ValidationError') return err = errors.handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}


async function getuserByCabymatricule(matricule,res) {
    try {
        let result = await Car.find({ matricule: matricule })
        if(result.length == 0) {res.status(404).send("cars not found")} 
        else {
            let data = await UserCar.find({'Car' : result[0]._id}).populate('Owner Car', '-password -__v')
            if(data.length == 0) {res.status(404).send("cars not found")} 
            else {return data};}
    } catch(err) {
        if(err.name === 'ValidationError') return err = errors.handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}


async function getuserByCabymatriculeInWeb(matricule,res) {
    try {
        let result = await Car.find({ matricule: matricule })
        console.log('result',result)
        if(result.length == 0) {res.status(404).send("cars not found")} 
        else {
            
            let data = await UserCar.find({'Car' : result[0]._id}).populate('Owner Car', '-password -__v')
            console.log('data', data)
            
            if(data.length == 0) {res.status(404).send("cars not found")} 
            else {
                let user = data[0].Owner
                 // Send the email
           var transporter = nodemailer.createTransport(
            { service: 'gmail',  host: `${environment.SMTP_SERVICE_HOST}`, Port :`${environment.SMTP_SERVICE_PORT}`,
             auth: { user: `${environment. SMTP_USER_NAME}`, pass: `${environment.SMTP_USER_PASSWORD}`} });

            var mailOptions = { from: `${environment. SMTP_USER_NAME}`, 
            to: user.email, 
            subject: ' Votre voiture est mal garée ', 
            text: 'Bonjour '+ user.firstName +' '+ user.lastName + '\n\nVotre voiture est mal garée, je vous demande de bien vouloir la déplacer. \n\nMerci.'};
             
            transporter.sendMail(mailOptions, function (err) {

                if (err) { return res.status(500).send({ msg: err.message }); }
                res.json('A verification email has been sent to ' + user.email + '.');
            });
        //return data
            };}
    } catch(err) {
        if(err.name === 'ValidationError') return err = errors.handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}

async function deleteUserCar(id,res) {
    try {
        let result = await UserCar.findOneAndRemove({'_id' : id})
        console.log(result)
        if(!result) return res.status(404).send("UserCar not found")
        let data = await Car.findOneAndRemove({'_id' : result.Car})
        return data;
    } catch(err) {
        if(err.name === 'ValidationError') return err = errors.handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}


module.exports = {addUserCars, getUserCars, getCarsByUser, getuserByCabymatricule, getuserByCabymatriculeInWeb, deleteUserCar}
