const busboy = require('busboy');
const { bucketName } = require('../config');
const { storage } = require('./storage');

const readFileStream = (req,res,onFile)=>{

    let promises = []

    const bb = busboy({
        headers:req.headers
    })
    bb.on('file', (_,stream,info)=>{
        const result = onFile(stream,info)
        promises.push(result)
    });

    bb.on("error",(error)=>{
        console.log(error)
        res.status(500).json({
            success:false,
            message:"An error ocurred"
        })
    })

    bb.on("finish",async ()=>{
        const results = await Promise.allSettled(promises)
        res.status(200).json(results)
    })

    req.pipe(bb)
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