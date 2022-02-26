const mongoose =require('mongoose')
const Schema = mongoose.Schema

const ProductModel = new Schema({
    nameSP: {
        type:String,
        maxlength:50,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    level: {
        type: String,
        edum:[M,L,XL,XXL]
    }
})

module.exports = mongoose.model('product', ProductModel)