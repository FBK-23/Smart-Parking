var express = require('express');
var router = express.Router();
const userService = require("../Service/UserService")
const carService = require("../Service/CarService")
const userCarService = require("../Service/UserCarService")


const homedir = require('os').homedir();
console.log("homedir", homedir)

const dotenv = require('dotenv');
dotenv.config();
const multer  = require('multer');
const fs = require('fs');



/**get All users  */
router.get('/', async function (req, res) {

    let result = await userService.getAllUsers(res);
    res.json(result)
 
 })


 /**get All cars  */
router.get('/cars', async function (req, res) {

    let result = await carService.getCars(res);
    res.json(result)
 
 })
 router.get('/usercar', async function (req, res) {

    let result = await userCarService.getUserCars(res)
    res.json(result);
 
 })

 /* Get user byId */
 router.get('/:id', async function (req, res) {
     var id = req.params.id;
    let result = await userService.getUserById(id, res);
    res.json(result)
 });

 router.get('/findUserbyEmail/:email', async function (req, res) {
    var email = req.params.email;
     let result = await userService.findUserbyEmail(email,res);
     res.json(result)
})

router.delete('/delete/:id',async (req, res)=> {
    var id = req.params.id;
    let result = await userCarService.deleteUserCar(id,res)
    res.json(result);

});

router.get('/findCarbyMatricule/:matricule', async(req, res) => {

    let plate = req.params.matricule;
    let result = await userCarService.getuserByCabymatricule(plate, res)
    res.json(result);
    
});

router.delete('/deleteUser/:id',async (req, res)=> {
    var id = req.params.id;
    let result = await userService.deleteUser(id,res)
    res.json(result);

});




router.post('/', async (req, res) => {

    let Carinfo = req.body;
    await carService.addCars(Carinfo,res);
    
});

module.exports = router;


