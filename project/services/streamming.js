// 1. Crear bucket
// 2. Investigar acerca de los stream
// 3. Investigar acerca de raw-body

const { uploadFile,downloadFile } = require("../libs/storage");

class Streamming{

    downloadFile(name,writableStream){
        downloadFile(name,writableStream)
    }

    async uploadFile(file, info){
        const { filename } = info;

        return await uploadFile(filename,file)
    }
}

module.exports = Streamming