const express = require("express")
const { port } = require("./config")
const routes = require("./routes")

const app = express()

routes(app)

app.get("/health",(req,res)=>{
    return res.json({
        hola:"mundo"
    })
})

app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})