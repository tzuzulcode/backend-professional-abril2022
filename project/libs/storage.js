const {Storage} = require("@google-cloud/storage")
const { bucketName } = require("../config")
const fs = require("fs")

const storage = new Storage({
    keyFilename:"credentials.json"
})

const uploadFile = (fileName, stream,contentType)=>{
    console.log(contentType)

    const file = storage.bucket(bucketName).file(fileName)
    // stream.pipe(file.createWriteStream({
    //     metadata:{
    //         contentType
    //     }
    // }))
    try {
        stream.pipe(file.createWriteStream({
            resumable:false,
            timeout:100000,
            
        }))
    } catch (error) {
        console.log(error)
    }
    
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
    downloadFile,
    storage
}