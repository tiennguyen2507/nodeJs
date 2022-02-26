require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const indexRouter = require('./routes')
const cosr = require('cors')

const bodyParser = require('body-parser')
const Router = require('./routes/post')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//cosr
app.use(cosr())


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@todo.bfkwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        console.log(`Đã conect đến ĐB`)
    } catch (err) {
        console.log(err)
    }
}

connectDB()

indexRouter(app)

const port = 5000
app.listen(port, () => {
    console.log(`server đang chạy trên cổng ${port}`)
})