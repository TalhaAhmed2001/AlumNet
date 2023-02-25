const mongoose = require('mongoose')

const storiesSchema = mongoose.Schema({
    ERP: { type: Number, required: [true, 'Please enter ERP id'] },
    story: [{ type: String, required: [true, 'Please enter text'] }], //single date OR individual date for each story
    dateCreated: { type: Date, required: true, default: Date.now }, 
    Name: { type: String, required: [true, 'Please enter text'] },
    popularity: { type: Number, required: true, default: 0 },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('stories', storiesSchema)