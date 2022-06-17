const {Storage} = require("@google-cloud/storage")
const { bucketName } = require("../config")

const storage = new Storage({
    keyFilename:"credentials.json"
})

const uploadFile = (fileName, stream)=>{

    const file = storage.bucket(bucketName).file(fileName)
    stream.pipe(file.createWriteStream())
    .on("end",()=>{
        console.log("Terminó")
    })
    .on("error",(error)=>{
        console.log(error)
    })
}
const downloadFile = (fileName, writableStream)=>{

    const file = storage.bucket(bucketName).file(fileName)
    const fileStream = file.createReadStream()
    .on("error",(error)=>{
        // if(error.code===404){

        // }
        console.log(error)
    })

    fileStream.pipe(writableStream)
    .on("finish",()=>{
        console.log("Terminó")
    })
}

module.exports = {
    uploadFile,
    downloadFile
}