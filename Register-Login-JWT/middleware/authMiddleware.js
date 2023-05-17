const jwt = require('jsonwebtoken')
const requiredAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'srtjkjklmnot8852za@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk',(err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect('/login')
            }else{
                console.log(decodedToken)
                next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

module.exports= {requiredAuth}