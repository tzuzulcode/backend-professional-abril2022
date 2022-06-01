//const client = require("../helpers/connection")()
const {PrismaClient} = require("@prisma/client")
const client = new PrismaClient()

class Users{
    async getAll(){
        const users = await client.user.findMany()
        return users
    }

    async getByEmail(email){
        const user = await client.user.findFirst({
            where:{
                email
            }
        })

        return user
    }

    async create(userData){
        const user = await client.user.create({
            data:userData
        })

        return user
    }

    async update(iduser,data){
        const id = Number.parseInt(iduser)
        const user = await client.user.update({
            where:{
                id
            },
            data
        })

        return user
    }

    async delete(idUser){
        const id = Number.parseInt(idUser)
        const user = await client.user.delete({
            where:{
                id
            }
        })

        return user
    }
}

module.exports = Users