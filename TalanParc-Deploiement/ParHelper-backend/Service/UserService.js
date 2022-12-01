var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('../models/User');
var Car = require('../models/Car');
var UserCar = require('../models/UserCar');
var Token = require('../models/Token');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
let environment = require("../utils/back-config");
var errors = require ("../utils/errorHelper")

async function addUser (userInfo,res){
   
    try{
        
            
        var user= new User(userInfo);
        const result = await  user.save();
        console.log("resultadd",result)
        cryptedPass = bcrypt.hashSync(userInfo.password, bcrypt.genSaltSync(10));
        const userUpdate = await User.findOneAndUpdate({ 'email': result.email }, {"password":cryptedPass}, { new: true })
        
        
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            // Send the email
           var transporter = nodemailer.createTransport(
            { service: 'gmail',  host: `${environment.SMTP_SERVICE_HOST}`, Port :`${environment.SMTP_SERVICE_PORT}`,
             auth: { user: `${environment. SMTP_USER_NAME}`, pass: `${environment.SMTP_USER_PASSWORD}`} });

            var mailOptions = { from: `${environment. SMTP_USER_NAME}`, 
            to: user.email, 
            subject: ' Vérification de compte ', 
            text: 'Bonjour '+ user.firstName +' '+ user.lastName + '\n\nVeuillez vérifier votre compte en cliquant sur le lien: \n'+`${environment.APP_FRONT_URL}`+'/#/authentication/activate-account/?token='+token.token +'\n\nMerci.'};
               
            transporter.sendMail(mailOptions, function (err) {

                if (err) { return res.status(500).send({ msg: err.message }); }
                res.json('A verification email has been sent to ' + user.email + '.');
            });
            });
        
       
    }  
    catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }

}


    
async function getAllUsers(res) {
    try {
        let result = await User.find();
        if (result.length == 0 ){
            res.status(404).send({ message: "users not found" });
        } else {
            return result
        }
    }
    catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}

async function getUserById(userId, res) {
    try {
        const result = await User.find({ '_id': userId })
        if (result.length == 0) {
            res.status(404).send({ message: "user Not found" });
        } else {
            return result
        }
    }
    catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }

}

async function updateProfile(userInfo, res) {
    try {
        const result = await User.findOneAndUpdate({ '_id': userInfo._id }, userInfo, { new: true })
        if (!result) {
            res.status(404).send({ message: "user Not found" });
        } else {
            return result
        }
    }
    catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}

async function updateUserProfile(userInfo, res) {
    try {
        const result = await User.findOneAndUpdate({ 'email': userInfo.email }, userInfo, { new: true })
        var token = jwt.sign(result.toObject(), "secret", { expiresIn: '1h' });
        console.log("token", token)
        return { token: token.toString() }
    }

    catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }

}

async function AdminupdateProfiles(userInfo, res) {
    try {
        const result = await User.findOneAndUpdate({ 'email': userInfo.email }, userInfo, { new: true })
        return result
    } catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}

async function authenticate(userInfo, res) {
    try {
        const result = await User.findOne({ 'email': userInfo.email })
        if (!result) {
            res.status(404).send({ message: "email inexistant !" });
        }
        else {

            if (!result.confirmMail) {
                res.status(404).send({ message: " Confirmer votre email ! " });

            }
            else if (bcrypt.compareSync(userInfo.password, result.password)) {
                //var token=jwt.sign( result.toObject(),"secret",{expiresIn:'1h'});
                var token = jwt.sign(result.toObject(), "secret");
                //res.send(result);
                return { token: token.toString() }
            }
            else res.status(404).send({ message: " Veuillez verifier votre mot de passe " });
        }
    }
    catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}


async function decodetoken(usertoken, res) {
    try {
        let decoded = await jwt.verify(usertoken, 'secret')
        if (decoded) {
            return decoded
        }
        else { res.status(404).send({ message: "token inexistant ou expiré " }) }
    }
    catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }

}

async function confirmationPost(usertoken, res) {

    console.log("my token " + usertoken, " ");

    try {
        const token = await Token.findOne({ token: usertoken })
        var now = Date.now();
        console.log("date", now - Date.parse(token.createdAt))
        if (!token || ((now - Date.parse(token.createdAt)) > 10800000)){
            res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });}
        // If we found a token, find a matching user
        else{
        const user = await User.findOne({ _id: token._userId })
        console.log(user)
        if (!user)  {res.status(400).send({ msg: 'We were unable to find a user for this token.' });}
        else if (user.confirmMail) { res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });}
        else{
        // Verify and save the user
        user.confirmMail = true;
        const result = await user.save()
        return {msg:"The account has been verified. Please log in."}}}

    }
    catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}


async function forgetPassword(newPassword, usertoken, res) {

    console.log("my token " + usertoken, " ");

    try {
        const token = await Token.findOne({ token: usertoken })
        var now = Date.now();
        console.log("date", now - Date.parse(token.createdAt))
        if (!token || ((now - Date.parse(token.createdAt)) > 10800000)){
            res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });}
        // If we found a token, find a matching user
        else{
        const user = await User.findOne({ _id: token._userId })
        console.log(user)
        if (!user)  {res.status(400).send({ msg: 'We were unable to find a user for this token.' });}
    
        else{
        // change password and save the user
        let hashedNewPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
        let data = await User.updateOne({ '_id': user._id }, { $set: { password: hashedNewPassword }})
        return data    
    }}

    }
    catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}


async function findUserbyEmail(useremail,res) {
    try{
const result = await User.find({ 'email': useremail })
if(!result){
    res.status(404).send();

}else{
    return result;
}
}
catch (err) {
    if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
    if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
    res.status(500).send('An unknown error occured.');
}

}
async function decodetoken(usertoken, res) {
    try {
        const decoded = await jwt.verify(usertoken, 'secret')
        if (decoded) {
            return decoded
        }
        else { res.status(404).send({ message: "token inexistant ou expiré " }) }
    }
    catch (err) {
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }



}


async function resendTokenPost (useremail,res){
     
   try{
    const user = await User.findOne({ email: useremail })

    if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });

    // Create a verification token, save it, and send email
    var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

    if (user.confirmMail && user.confirmPass) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });


    // Save the token
    token.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }

        // Send the email
        var transporter = nodemailer.createTransport(
            { service: 'gmail',  host: `${environment.SMTP_SERVICE_HOST}`, Port :`${environment.SMTP_SERVICE_PORT}`,
             auth: { user: `${environment. SMTP_USER_NAME}`, pass: `${environment.SMTP_USER_PASSWORD}`} });

            var mailOptions = { from: `${environment. SMTP_USER_NAME}`, 
            to: user.email, 
            subject: 'Account Verification Token', 
            text: 'Hello Please verify your account by clicking the link: '+`${environment. APP_FRONT_URL}`+'/#/extra-layout/confirmationPost/' + token.token  };
               
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                return {msg:'A verification email has been sent to ' + user.email + '.'}
            });
    });
   }
        catch(err){
            if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
            if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
            res.status(500).send('An unknown error occured.');
        }
    
}

async function deleteUser (id, res) {
    try {
        let result = await User.findOneAndRemove({ '_id': id }).exec();
        let result2 = await Token.findOneAndRemove({ '_userId': id }).exec();

        if (!result) {
            res.status(404).send({ message: "user inexistant !" });
        } else {
            let UserCarResult = await UserCar.find({ 'Owner': result._id }).exec();
            UserCarResult.forEach(async function (usercar) {
            let CarResult = await Car.findOneAndRemove({ '_id': usercar["Car"] }).exec();
            let result = await UserCar.findOneAndRemove({ 'Owner': usercar["Owner"] }).exec();
        })
            return { message: "succesfully deleted" }
        }
    }  catch(err){
        if (err.name === 'ValidationError') return err = errors.handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = errors.handleDuplicateKeyError(err, res);
        res.status(500).send('An unknown error occured.');
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateProfile,
    AdminupdateProfiles,
    updateUserProfile,
    authenticate,
    decodetoken,
    findUserbyEmail,
    resendTokenPost,
    confirmationPost,
    forgetPassword,
    deleteUser
}
