const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const schema = new mongoose.Schema({
    borrowers:{
        type: Schema.Types.ObjectId, 
        ref: 'borrowers',
        required: true
    },
    book:[{
        type: Schema.Types.ObjectId, 
        ref: 'Book',
        required: true
    }],
    dueAt:{
        type: Date,
        default:  new Date(new Date().setDate(new Date().getDate() + 7))
    },
    returnAt: {
        type: Date,
        default: null
    },
    lateFee:{
        type: Number,
        default: 0
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

const borrowModel = mongoose.model('Borrow',schema)

module.exports = borrowModel;