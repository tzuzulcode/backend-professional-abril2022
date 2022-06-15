const express = require("express")
const cookie = require("cookie-parser")

const port = 4000
const app = express()

// Middlewares:
app.use(express.json())
app.use(cookie())

//Importando routers
const songs = require("./routes/songs")
const playlists = require("./routes/playlist")
const auth = require("./routes/auth")
const stream = require("./routes/stream")

songs(app)
auth(app)
stream(app)
playlists(app)

app.get("/",(req,res)=>{
    return res.json({
        hola:"mundo"
    })
})

app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})