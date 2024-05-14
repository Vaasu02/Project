const jwt=require('jsonwebtoken');

function authenticatetoken(req,res,next){
    const authHeader=req.header("authorization");
    const token=authHeader && authHeader.split(" ")[1];

    if(!token) return res.sendStatus(401);
       

    jwt.verify(token,`${process.env.JWT_KEY}`,(err,user)=>{
        if(err) return res.sendStatus(400);
        req.user=user;
        next();
    })

}

module.exports={
    authenticatetoken,
};