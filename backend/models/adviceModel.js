const mongoose = require('mongoose')

const adviceSchema = mongoose.Schema({
    ERP: { type: Number },
    Name: { type: String},
    //category is which field is advice related to , for example CS, BBA etc. It can be General too.
    category: {type: String, requried: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    popularity: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Advice', adviceSchema)