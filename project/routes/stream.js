const {Router} = require("express")
const {URLSearchParams} = require("url")
const qs = require("querystring")


function stream(app){
    const router = Router()
    app.use("/stream",router)

    router.post("/",(req,res)=>{
        // let body
        req.on("data",data=>{
            console.log(data)
            // body+=data
        })
        // req.on("end",()=>{
        //     const post = qs.parse(body)
        //     console.log(post)
        // })
        return res.json({
            success:true
        })
    })
}

module.exports = stream

