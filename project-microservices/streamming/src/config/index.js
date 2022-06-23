require("dotenv").config({
    path:"./src/.env"
})

const config = {
    port:process.env.PORT,
    bucketName:process.env.BUCKET_NAME
}


console.log(config.port)


module.exports = config