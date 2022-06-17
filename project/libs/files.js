const busboy = require('busboy');

const readFileStream = (req,onFile)=>{
    const bb = busboy({
        headers:req.headers
    })
    bb.on('file', (name,stream,info)=>{
        onFile(name,stream,info)
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