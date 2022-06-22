const {Storage} = require("@google-cloud/storage")
const { bucketName } = require("../config")
const uuid = require("uuid")
const path = require("path")

const storage = new Storage({
    keyFilename:"credentials.json"
})

const uploadFile = (fileName, stream)=>{
    return new Promise((resolve,reject)=>{
        const newFileName = uuid.v4() + path.extname(fileName)
        const file = storage.bucket(bucketName).file(newFileName)

        stream.pipe(file.createWriteStream())
        .on("error",error=>{
            console.log(error)
            reject({
                success:false,
                message:"An error ocurred"
            })
        })
        .on("finish",()=>{
            resolve({
                success:true,
                message:"Uploaded successfully",
                fileName:newFileName
            })
        })
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
    downloadFile,
    storage
}