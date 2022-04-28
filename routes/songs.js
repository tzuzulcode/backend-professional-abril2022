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

    router.post("/",async (req,res)=>{

        const users = await songsService.create(req.body)
        return res.json(users)
    })

    router.put("/:id",async (req,res)=>{
        const id = req.params.id
        const users = await songsService.update(id,req.body)
        return res.json(users)
    })

    router.delete("/:id",async (req,res)=>{
        const id = req.params.id
        const users = await songsService.delete(id)
        return res.json(users)
    })

}


module.exports = songs