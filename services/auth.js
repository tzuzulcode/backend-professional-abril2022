const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Users = require("./users")

class Auth{

    async login(credentials){
        const {email,password} = credentials
        const userService = new Users()

        const user = await userService.getByEmail(email)

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
        const userService = new Users()
        credentials.password = await this.encrypt(credentials.password)
        const user = await userService.create(credentials)

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
        
        //Investigar HTTP Only Cookies

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