const {Router} = require("express")
const { readFileStream } = require("../libs/files")
const Streamming = require("../services/streamming")

function stream(app){
    const router = Router()
    const streamming = new Streamming()
    app.use("/stream",router)

    router.post("/",(req,res)=>{

        const bb = readFileStream(req,streamming.uploadFile)

        req.pipe(bb)
        return res.json({
            success:true
        })
    })
}

module.exports = stream

