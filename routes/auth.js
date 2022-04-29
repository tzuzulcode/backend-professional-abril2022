const express = require("express")

const Auth = require("../services/auth")

function auth(app){
    const router = express.Router()

    const authService = new Auth()

    app.use("/auth",router)

    router.post("/login",async (req,res)=>{

        const user = await authService.login(req.body)

        return res.json(user)
    })
    router.post("/signup",(req,res)=>{

        const user = authService.signup(req.body)

        return res.json(user)
    })
}

module.exports = auth