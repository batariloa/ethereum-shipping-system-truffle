const express = require('express')
const app = express()
require('dotenv').config()
const path = require("path");
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
require('express-async-errors')


const port = process.env.PORT
app.use(express.static(__dirname + '/public'));


const shippingRouter = require('./routes/shippingRoutes')
const authRouter = require('./routes/authRoutes')

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "public"));


app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser(process.env.JWT_SECRET))


app.use('/api/v1/',shippingRouter)
app.use('/api/v1/auth', authRouter)  

const connectDB = require('./db/connect')

const start = async ()=>{
    try{    
        console.log('blop', process.env.MONGO_URI)

        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log('Listening on port', port, '...'))
    }
    catch(error){
        console.log(error)
    }
}

start()