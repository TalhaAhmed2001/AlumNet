const asyncHandler = require('express-async-handler')
const Stories = require('../models/storiesModel')

//GET
const getStories = asyncHandler(async (req, res) => {
    const stories = await Stories.findById(req.params.id)

    res.status(200).json(stories)

})

//POST
const createStories = asyncHandler(async (req, res) => {

    const stories = new Stories({
        ERP: req.body.erp,
        story: req.body.story,
        dateCreated: req.body.date,
        Name: req.body.name
    })

    stories.save()
    .then(()=>{
        res.status(200).json({ message: "Stories successfully created" })
    })
    .catch(err=>res.status(400).send(err))
    
})

//POST
const addStories = asyncHandler(async (req, res) => {
    
    const stories = req.body.story

    Stories.updateOne(
        { _id: 1 },
        { $push: { story: stories } }
    )
    .then()
})

//PATCH
const updateStories = asyncHandler(async (req, res) => {

    Stories.findById(req.params.id)
        .then(stories => {
            stories.story = req.body.story
            stories.dateCreated = Date.parse(Date.now);

            stories.save()
                .then(() => res.json('Stories successfully updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error : ' + err));

})

module.exports = {
    getStories,
    createStories,
    addStories,
    updateStories
}