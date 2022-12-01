var jwt  =require('jsonwebtoken');

function verifyAccess(req,res) {

    var header=req.headers.authorization;
    if(header){
        var token= header.split(' ')[1];
        if(jwt.verify(token,'secret',function (err,result) {
            if(err){
                res.send(err);
            }
            else res.send(result)

        })){
            res.send(result);

        }
        else {
            // res.status(403).json("not valid token");
            res.send({message : "not valid token"});
        }
    }
}
