const asyncHandler = require("express-async-handler")
const Advice = require('../models/adviceModel')
const Stories = require('../models/storiesModel')
const { request } = require('../config/dbConfig')

//POST
const approveProfile = asyncHandler(async (req, res) => {

    const id = req.params.id

    try {
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

    //console.log(config)

    try {
        let result = await request
            .query(`SELECT * FROM alumni_profile WHERE id = ${id}`)

        if (result.recordset[0] == null) {
            res.status(400).json({ message: `Alumnus with id = ${id} does not exist` })
        }

        result = await request
            .input('id', sql.Int, id)
            .execute('DeleteAlumnus')

        Advice.deleteOne({ ERP: id })
        Stories.deleteOne({ ERP: id })
        res.status(200).json({ message: "Alumnus successfully eradicated" })

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
        let result = await request
            .query(`SELECT * FROM student_profile WHERE id = ${id}`)

        if (result.recordset[0] == null) {
            res.status(400).json({ message: `Student with id = ${id} does not exist` })
        }

        await request
            .input('id', sql.Int, id)
            .execute('DeleteStudent')

        res.status(200).json({ message: "Student successfully eradicated" })

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
