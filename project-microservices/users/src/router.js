const express = require("express")
const Users = require("./users")

const usersMicroServ = new Users()

const router = express.Router()

router.get("/", async (req,res)=>{
    const users = await usersMicroServ.getAll()

    return res.json(users)
})

router.get("/", async (req,res)=>{
    const user = await usersMicroServ.getByEmail(req.body.email)
    return res.json(user)
})

router.post("/", async (req,res)=>{
    const user = await usersMicroServ.create(req.body)

    return res.json(user)
})

router.put("/:id", async (req,res)=>{
    const user = await usersMicroServ.update(req.params.id,req.body)

    return res.json(user)
})

router.delete("/:id", async (req,res)=>{
    const user = await usersMicroServ.getAll(req.params.id,req.body)

    return res.json(user)
})

module.exports = router