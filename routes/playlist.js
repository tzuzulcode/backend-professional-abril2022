const express = require("express")
const auth = require("../middleware/auth")
const PlaylistService = require("../services/playlist")

function playlists(app){
    const router = express.Router()

    const playlistServ = new PlaylistService()

    app.use("/api/playlists",router)

    router.post("/create",auth, async (req,res)=>{
        const name = req.body.name
        const userId = req.user.id
        const playlist = await playlistServ.create(name,userId)

        return res.json(playlist)
    })
}

module.exports = playlists