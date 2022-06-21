const busboy = require('busboy');
const { bucketName } = require('../config');
const { storage } = require('./storage');

const readFileStream = (req,onFile)=>{
    const bb = busboy({
        headers:req.headers
    })
    bb.on('file', (name,stream,info)=>{
        console.log(name)
        // onFile(name,stream,info)
        const writable = storage.bucket(bucketName).file(name).createWriteStream()
        // stream
        // .on("finish",()=>{
        //     console.log("FINISH")
        // })
        // .on("error",(error)=>{
        //     console.log(error)
        // })
        // .pipe()
        console.log(stream.readableLength)
        let written = 0
        stream.on("data",(data)=>{
            writable.write(data,()=>{
                written += data.length
                console.log("Written: ",written, "de: ")
            })
        })
    });


    return bb
}

// (name, file, info) => {
//     const { filename, encoding, mimeType } = info;
//     console.log(file)
//     console.log(
//         `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
//         filename,
//         encoding,
//         mimeType
//     );
//     file.pipe()
// }

module.exports = {
    readFileStream
}