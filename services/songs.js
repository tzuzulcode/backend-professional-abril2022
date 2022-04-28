const {PrismaClient} = require("@prisma/client")

const client = new PrismaClient()

class Songs{
    async getAll(){
        const songs = await client.song.findMany({
            include:{
                author:true
            }
        })
        return songs
    }

    async create(songData){
        const data = {
            data:songData
        }
        console.log(data)
        const song = await client.song.create(data)

        return song
    }

    async update(idSong,data){
        const id = Number.parseInt(idSong)
        const song = await client.song.update({
            where:{
                id
            },
            data
        })

        return song
    }

    async delete(idSong){
        const id = Number.parseInt(idSong)
        const song = await client.song.delete({
            where:{
                id
            }
        })

        return song
    }
}

module.exports = Songs