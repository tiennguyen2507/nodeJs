const express =  require('express')
const Router = express.Router()


//port product
Router.post('/', (req,res) => {
    res.send('post product')
})



module.exports = Router