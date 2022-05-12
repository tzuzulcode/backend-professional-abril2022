const express = require("express")
const router = require("./router")


const port = 4000

const app = express()

app.use(express.json())
app.use(router)

app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})