const express = require("express")
const SongsService = require("../services/songs")

function songs(app){
    const router = express.Router()
    app.use("/api/songs",router)

    const songsService = new SongsService()


    router.get("/",async (req,res)=>{

        const users = await songsService.getAll()
        return res.json(users)
    })

    // implementar POST- PUT - DELETE de la API
}


module.exports = songs