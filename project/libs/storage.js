const {Storage} = require("@google-cloud/storage")
const { bucketName } = require("../config")

const storage = new Storage({
    keyFilename:"credentials.json"
})

const uploadFile = (fileName, stream)=>{

    const file = storage.bucket(bucketName).file(fileName)
    stream.pipe(file.createWriteStream())
    .on("finish",()=>{
        console.log("Terminó")
    })
    .on("error",(error)=>{
        console.log(error)
    })
}

module.exports = {
    uploadFile
}