const {PrismaClient} = require("@prisma/client")

let client

function connection(){
    if(client){
        return client
    }
    
    client = new PrismaClient()
    return client
}

module.exports = connection