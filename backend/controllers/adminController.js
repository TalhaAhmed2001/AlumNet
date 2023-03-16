const asyncHandler = require("express-async-handler")
const Advice = require('../models/adviceModel')
const Stories = require('../models/storiesModel')
const { pool,sql } = require('../config/dbConfig')

//PATCH
const approveProfile = asyncHandler(async (req, res) => {

    const id = req.params.id

    try {
        
        const request = pool.request()

        await request
            .input('id', sql.Int, id)
            .execute('ApproveProfile')

        res.status(200).json({ message: "Profile approved" })
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//DELETE 
const deleteAlumnusProfile = asyncHandler(async (req, res) => {

    const id = req.params.id

    try {
        
        const request = pool.request()

        const result = await request
            .input('id', sql.Int, id)
            .execute('DeleteAlumnus')

        if (result.returnValue === 1){
            Advice.deleteOne({ ERP: id })
            Stories.deleteOne({ ERP: id })
            res.status(200).json({ message: "Alumnus successfully eradicated" })
        }
        else {
            res.status(400).json({ message: `Profile with ID = ${id} does not exist` })
        }

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//DELETE 
const deleteStudentProfile = asyncHandler(async (req, res) => {
    const id = req.params.id

    try {
        
        const request = pool.request()

        const result = await request
            .input('id', sql.Int, id)
            .execute('DeleteStudent')

        if (result.returnValue === 1){
            res.status(200).json({ message: "Student successfully eradicated" })
        }
        else {
            res.status(400).json({ message: `Profile with ID = ${id} does not exist` })
        }

        
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

module.exports = {
    approveProfile,
    deleteAlumnusProfile,
    deleteStudentProfile
}
