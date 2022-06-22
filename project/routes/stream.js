const {Router} = require("express")
const { readFileStream } = require("../libs/files")
const Streamming = require("../services/streamming")

function stream(app){
    const router = Router()
    const streamming = new Streamming()
    app.use("/stream",router)

    router.get("/:fileName",(req,res)=>{
        streamming.downloadFile(req.params.fileName,res)
    })

    router.post("/",(req,res)=>{
        readFileStream(req,res,streamming.uploadFile)
    })
}

module.exports = stream

