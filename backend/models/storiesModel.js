const mongoose = require('mongoose')

const storiesSchema = mongoose.Schema({
    ERP: { type: Number },
    Name: { type: String},
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
    popularity: { type: Number, default: 0 },


},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('stories', storiesSchema)