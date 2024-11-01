const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    is_Admin:{
        type: Boolean,
        default: false
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    updateAt:{
        type: Date,
        default: Date.now
    },
    deleteAt:{
        type: Date,
        default: null
    }
})

const userModel = mongoose.model('User',schema)

module.exports = userModel;