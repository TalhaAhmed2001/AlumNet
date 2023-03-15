const mongoose = require('mongoose')

const storiesSchema = mongoose.Schema({
    ERP: { type: Number, required: [true, 'Please enter ERP id'] },
    Name: { type: String, required: [true, 'Please enter text'] },
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
    popularity: { type: Number, default: 0 },


},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Stories', storiesSchema)
