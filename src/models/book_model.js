const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: null
    },
    author:[{
        type: Schema.Types.ObjectId, 
        ref: 'Author',
        default: null
    }],
    category:[{ 
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        default: null
    }],
    publishedYear:{
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

const bookModel = mongoose.model('Book',schema)

module.exports = bookModel;