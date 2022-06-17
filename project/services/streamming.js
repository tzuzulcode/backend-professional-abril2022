// 1. Crear bucket
// 2. Investigar acerca de los stream
// 3. Investigar acerca de raw-body

const { uploadFile,downloadFile } = require("../libs/storage");

class Streamming{

    downloadFile(name,writableStream){
        downloadFile(name,writableStream)
    }

    uploadFile(name, file, info){
        const { filename, encoding, mimeType } = info;
        console.log(
            `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            filename,
            encoding,
            mimeType
        );

        uploadFile(filename,file)
    }
}

module.exports = Streamming