const mongoose = require('mongoose')

const adviceSchema = mongoose.Schema({
    ERP: { type: Number, required: [true, 'Please enter ERP id'] },
    advice: { type: String, required: [true, 'Please enter text'] },
    dateCreated: { type: Date, required: true, default: Date.now},
    Name: { type: String, required: [true, 'Please enter Name'] },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Advice', adviceSchema)