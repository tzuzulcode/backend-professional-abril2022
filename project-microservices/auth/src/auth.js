const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const axios = require("axios")

const client = new axios.Axios({
    baseURL:"http://localhost:4001"
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

        // Try Catch

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
        console.log(credentials)
        credentials.password = await this.encrypt(credentials.password)
        // const user = await userService.create(credentials)
        const user = await client.post("/",
            credentials
        )

        if(user){
            const token = this.createToken(user)
            
            console.log(token)
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


    validate(token){
        try {
            const data = jwt.verify(token,"12345")
            return {
                success:true,
                data
            }
        } catch ({message}) {
            return {
                success:false,
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