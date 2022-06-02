const express = require("express")


const router = require("./routes")


const app = express()

app.use(express.json())

app.use(router)

const port = process.env.PORT

app.get("/health",(req,res)=>{
    return res.send("OK")
})

app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})