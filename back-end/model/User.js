const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

//Export the model
module.exports = mongoose.model('users', userSchema);
