const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const axios = require("axios")

const client = axios.default.create({
    baseURL:"http://users:4000/api/users"
})

class Auth{

    async login(credentials){
        const {email,password} = credentials
        // const userService = new Users()
        // const user = await userService.getByEmail(email)
        const {data:user} = await client.get("/byEmail",{
            params:{
                email
            }
        })

        if(user && this.compare(password,user.password)){
            delete user.password
            const token = this.createToken(user)

            return {
                logged:true,
                data:user,
                token
            }
        }


        return {
            logged:false,
            message:"Credenciales incorrectas. Verificar."
        }

    }

    async signup(credentials){
        // const userService = new Users()
        credentials.password = await this.encrypt(credentials.password)
        // const user = await userService.create(credentials)
        try {
            const {data:user} = await client.post("/",
                credentials
            )

            delete user.password

            if(user){
                const token = this.createToken(user)
                return {
                    logged:true,
                    data:user,
                    token
                }
            }
    
            return {
                logged:false,
                message:"Credenciales incorrectas. Verificar."
            }
        } catch (error) {
            console.log(error)
            return {
                logged:false,
                message:"Ocurrió un error"
            }
        }

        

    }


    validate(token){
        try {
            const data = jwt.verify(token,"12345")
            delete data.iat
            return {
                logged:true,
                data
            }
        } catch ({message}) {
            return {
                logged:false,
                message
            }
        }
    }

    createToken(data){
        const token = jwt.sign(data,"12345")

        return token
    }

    async encrypt(text){
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(text,salt)
        return hash
    }

    async compare(text,hash){
        const result = await bcrypt.compare(text,hash)
        return result //true o false
    }
}


module.exports = Auth