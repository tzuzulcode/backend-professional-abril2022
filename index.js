const express = require("express")
const port = 4000
const app = express()

app.use(express.json())

//Importando routers
const songs = require("./routes/songs")
const auth = require("./routes/auth")

songs(app)
auth(app)

app.get("/",(req,res)=>{
    return res.json({
        hola:"mundo"
    })
})

app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})