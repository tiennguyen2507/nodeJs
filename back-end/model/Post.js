const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchima = new Schema({
    title: {
        type : String , 
        require: true,
    },
    decription: {
        type: String
    },
    url: {
        type: String
    },
    status:{
        type: String
    },  
    user: {
        type: String,
        ref: 'users'
    }
})

module.exports = mongoose.model('posts', postSchima)