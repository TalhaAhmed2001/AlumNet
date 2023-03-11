const asyncHandler = require('express-async-handler')
const Advice = require('../models/adviceModel')

//GET
const getAdvice = asyncHandler(async (req, res) => {

    const erp = req.params.id

    try {
        const stories = await Advice.find({ ERP: erp })

        res.status(200).json(stories)
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//POST
const createAdvice = asyncHandler(async (req, res) => {

    try {
        await Advice.create({
            ERP: req.body.erp,
            advice: req.body.story,
            dateCreated: req.body.date,
            Name: req.body.name
        })

        res.status(200).json({ message: 'Advice successfully created' })

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//POST
const addAdvice = asyncHandler(async (req, res) => {

})

//PUT
const updateAdvice = asyncHandler(async (req, res) => {

    try {
        const Advice = await Advice.findById(req.params.id)
        .then(advices => {
            advices.advice = req.body.advice
            advices.dateCreated = Date.parse(Date.now);

            advices.save()
                .then(() => res.json('Advice successfully updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error : ' + err));

    }
    catch (err) {

    }
    
    /*Advice.replaceOne(
        { _id: req.body.id },
        { 
          ERP: req.body.erp, 
          advice: req.body.advice, 
          dateCreated: Date.parse(Date.now),
          Name: req.body.name
        }
      )
      .then(()=>{
        res.status(200).json({message: 'Advice successfully updated'})
      })
      .catch(err=>res.status(400).json('Error : ' + err))*/

})

module.exports = {
    getAdvice,
    createAdvice,
    addAdvice,
    updateAdvice
}