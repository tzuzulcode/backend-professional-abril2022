const {PrismaClient} = require("@prisma/client")
const client = new PrismaClient()

class Playlist{
    async create(name,ownerId){
        const playlist = await client.playlist.create({
            data:{
                name,
                owner:{
                    connect:{
                        id:Number.parseInt(ownerId)
                    }
                }
            }
        })

        return playlist
    }
}


module.exports = Playlist