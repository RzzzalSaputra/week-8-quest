const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    borrowersName:{
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

const borrowersModel = mongoose.model('borrowers',schema)

module.exports = borrowersModel;