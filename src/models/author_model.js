const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: null
    },
    bio:{
        type: String,
        default: null
    },
    debut:{
        type: String,
        default: null
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

const authorModel = mongoose.model('Author',schema)

module.exports = authorModel;