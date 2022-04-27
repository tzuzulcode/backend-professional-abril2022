const express = require("express")
const port = 4000
const app = express()

//Importando routers
const songs = require("./routes/songs")

songs(app)

app.get("/",(req,res)=>{
    return res.json({
        hola:"mundo"
    })
})

app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})