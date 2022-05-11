const jwt = require("jsonwebtoken")

function auth(req,res,next){
    const token = req.cookies.token

    try{
        const decoded = jwt.verify(token,"12345")
        req.user = decoded
        next()
    }catch(error){
        console.log(error)

        return res.status(403).json({
            error:true,
            message:"Insufficient permissions"
        })
    }

    
}

module.exports = auth