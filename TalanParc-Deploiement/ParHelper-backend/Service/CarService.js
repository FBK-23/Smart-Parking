var Car = require('../models/Car');
var errors = require ("../utils/errorHelper");



async function addCars(Carinfo,res) {
    try {
        var car = new Car(Carinfo)
        let data = await car.save();
        return data;
    } catch(err) {
        if(err.name === 'ValidationError') return err = errors.handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}

async function getCars(res){
    try {
        let data = await Car.find();
        if(data.length == 0) return res.status(404).send("cars not found")
        return data;
    } catch(err) {
        if(err.name === 'ValidationError') return err = errors.handleValidationError(err, res); 
        if(err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}


module.exports = {addCars,getCars}
