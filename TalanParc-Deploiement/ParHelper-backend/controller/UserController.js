var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('../models/User');
const userService = require("../Service/UserService")
const carService = require("../Service/CarService")
const userCarService = require("../Service/UserCarService")
var Token = require('../models/Token');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
let environment = require("../utils/back-config");
const homedir = require('os').homedir();
console.log("homedir", homedir)
const dotenv = require('dotenv');
dotenv.config();
const multer  = require('multer');
const upload = multer({ dest: process.env.UPLOAD_FOLDER_PATH });
const {spawn} = require('child_process');
const fs = require('fs');





router.post('/addUser', async function (req,res){
var userInfo = req.body
 await userService.addUser(userInfo,res)
});


/*update profile from user Id et retourne nouveau user info*/
router.put('/', async function (req, res) {
    var userInfo = req.body;
    let result = await userService.updateProfile(userInfo, res);
    res.json(result)
});

router.put('/resetPassword', function (req, res) {
    let oldPassword = req.body.oldPassword;
    let password = req.body.password;
    let usertoken = req.header('authorization').split(' ')[1];
    let decoded = jwt.verify(usertoken, 'secret');
    User.find({ '_id': decoded._id }).populate('').exec(async function (err, result) {
        if (err) {  
            res.send(err);
        }
        if (result.length == 0) {
            res.status(404).send();
        } 
        console.log(oldPassword);
        console.log(result);
        if (bcrypt.compareSync(oldPassword, result[0].password)) {
            let newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            let data = await User.updateOne({ '_id': decoded._id }, { $set: { password: newPassword }})
            res.json(data);
        }
        else {
            res.status(409).send("veuillez verifier votre mot de passe")
        }
    });
})


router.post('/authenticate', async function (req, res) {
    console.log("req", req.body)
    var userInfo = req.body;
    let result = await userService.authenticate(userInfo, res);
    res.json(result)

})


router.post('/confirmationPost/:token', async function (req, res) {
    var usertoken = req.params.token;
    console.log(usertoken)
    let result = await userService.confirmationPost(usertoken,res);
    res.json(result)  
});

router.post('/sendMailforgetPass',async function(req,res){
    let email = req.body.email
    console.log('email',email)
    await User.find({email: email}, function (err, user) { 
           console.log("user",user.length === 0)
                if(err){
                    return res.send(err);
                }
                if(user.length === 0){
                    console.log("here")
                    return res.status(404).send("Utilisateur introuvable ! ");
                }

               // Create a verification token for this user
                var token = new Token({ _userId: user[0]._id, token: crypto.randomBytes(16).toString('hex') });
         
                token.save(function (err) {
                    if (err) {  return res.status(500).send({ msg: err.message }); }
                    // Send the email
                    var transporter = nodemailer.createTransport(
                    { service: 'gmail',  host: `${environment.SMTP_SERVICE_HOST}`, Port :`${environment.SMTP_SERVICE_PORT}`,
                     auth: { user: `${environment. SMTP_USER_NAME}`, pass: `${environment.SMTP_USER_PASSWORD}`} });
        
                    var mailOptions = { from: `${environment. SMTP_USER_NAME}`, 
                    to: user[0].email, 
                    subject: 'Mot de passe oublié !', 
                    text: 'Bonjour '+user[0].firstName+' '+user[0].lastName+'\n\nCliquez sur le lien ci-dessous pour créer votre nouveau mot de passe: \n '+`${environment. APP_FRONT_URL}`+'/#/authentication/reset-pass-word/?token='+token.token  +'\n\nMerci.'};
                       
                    transporter.sendMail(mailOptions, function (err) {
        
                        if (err) {  console.log(err) ; return res.status(500).send({ msg: err.message }); }
                        res.json('A verification email has been sent to ' + user[0].email + '.');
                    });
                    });
    
    
    });
});

router.post('/forgetPassword/:token', async function (req, res) {
    var usertoken = req.params.token;
    var newPassword = req.body.password;
    let result = await userService.forgetPassword(newPassword, usertoken, res);
    res.json(result)  
});

router.post('/resendTokenPost', async function (req, res) {

    useremail = req.body.email
    let result = await userService.resendTokenPost(useremail,res);
    res.json(result)

});

router.get('/userByCar/find/:matricule',async (req, res) => {
    var matricule=req.params.matricule;
    let result = await userCarService.getuserByCabymatricule(matricule,res)
    res.json(result);
})


router.get('/userByCar/findInWeb/:matricule',async (req, res) => {
    var matricule=req.params.matricule;
    let result = await userCarService.getuserByCabymatriculeInWeb(matricule,res)
    res.json(result);
})
/**reurn user instance from user token */
router.post('/decodetoken', async function (req, res) {
    var token = req.body.token;
    let decoded = await userService.decodetoken(token, res);
    console.log(decoded)
    result = {
    "confirmMail":decoded.confirmMail,
    "role":decoded.role,
    "firstName":decoded.firstName,
    "lastName":decoded.lastName,
    "email":decoded.email,
    "telephone":decoded.telephone}
    res.json(result)


})
router.post('/saveUsercar', async (req, res) => {
    let carInfo = req.body
    console.log("carInfo",carInfo)
    let carData = await carService.addCars(carInfo,res);
    console.log(carData);
    if(typeof carData!=="undefined"){
        let idcar = carData._id;
        let usertoken = req.header('authorization').split(' ')[1];
        let decoded = jwt.verify(usertoken, 'secret')
    
        userCarInfo = {"Car": idcar, "Owner": decoded._id};
        console.log(userCarInfo);
        let result = await userCarService.addUserCars(userCarInfo, res);
        res.json(result);}
    

});

router.get('/carsByUser', async (req, res) => {
    let usertoken = req.header('authorization').split(' ')[1];
    console.log(req.header('authorization'));
    let decoded = jwt.verify(usertoken, 'secret')
    let result = await userCarService.getCarsByUser(decoded._id, res);
    res.json(result);
})

router.delete('/delete/:id',async (req, res)=> {
    var id = req.params.id;
    let result = await userCarService.deleteUserCar(id,res)
    res.json(result);

});

router.post('/userByCar/findByPlatePhoto', upload.single('file'), async (req, res) => {
    const image = req.file;
    console.log(image);
    imagePath = process.env.UPLOAD_FOLDER_PATH + "\\" + image.filename;  
    const python = spawn('python',[process.env.OCR_SCRIPT_PATH, imagePath]);
    python.stdout.on('data', async (data) => {
        plate = data.toString().replace(/(\r\n|\n|\r)/gm, "");
        //res.json({"mat": "28200085"});
        console.log(plate);
        let result = await userCarService.getuserByCabymatricule(plate, res)
        res.json(result);
    });
});



module.exports = router;
