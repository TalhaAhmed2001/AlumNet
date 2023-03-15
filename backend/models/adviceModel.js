const mongoose = require('mongoose')

const adviceSchema = mongoose.Schema({
    ERP: { type: Number, required: [true, 'Please enter ERP id'] },
    Name: { type: String, required: [true, 'Please enter Name'] },
    //category is which field is advice related to , for example CS, BBA etc. It can be General too.
    category: {type: String, required: true },
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
