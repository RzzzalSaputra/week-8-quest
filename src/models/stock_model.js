const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const schema = new mongoose.Schema({
    book:{
        type: Schema.Types.ObjectId, 
        ref: 'Book',
        required: true
    },
    quantity:{
        type: Number,
        default: 0
    },
    logs:[{
        type: String
    }],
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

const stockModel = mongoose.model('Stock',schema)

module.exports = stockModel;