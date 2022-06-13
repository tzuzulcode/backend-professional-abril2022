const express = require("express")
const router = require("./router")
const cors = require("cors")

const port = process.env.PORT

const app = express()

app.use(cors({
    origin:"*"
}))

app.use(express.json())
app.use("/api/users",router)

app.get("/health",(req,res)=>{
    return res.send("OK")
})

app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})