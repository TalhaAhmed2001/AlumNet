const asyncHandler = require("express-async-handler")
const Advice = require('../models/adviceModel')
const Stories = require('../models/storiesModel')
const { request } = require('../config/dbConfig')

//POST
const approveProfile = asyncHandler(async (req, res) => {

    const id = req.params.id

    request
        .input('id', sql.Int, id)
        .execute('ApproveProfile')

        .then(() => {
            res.status(200).json({ message: "Profile approved" })
        })
        .catch((err => {
            console.log(`Error executing query: ${err}`)
            res.status(400).send(err)
        }))

})

//DELETE 
const deleteAlumnusProfile = asyncHandler(async (req, res) => {

    const id = req.params.id

    //console.log(config)

    request
        .query(`SELECT * FROM alumni_profile WHERE id = ${id}`)

        .then(result => {
            if (result.recordset[0] == null) {
                res.status(400).json({ message: `Alumnus with id = ${id} does not exist` })
            }
        })

        .catch((err => {
            console.log(`Error executing query: ${err}`)
            res.status(400).send(err)
        }))


    request
        .input('id', sql.Int, id)
        .execute('DeleteAlumnus')

        .then(() => {
            Advice.deleteOne({ ERP: id })
            Stories.deleteOne({ ERP: id })
            res.status(200).json({ message: "Alumnus successfully eradicated" })
        })

        .catch((err => {
            console.log(`Error executing query: ${err}`)
            res.status(400).send(err)
        }))

})

//DELETE 
const deleteStudentProfile = asyncHandler(async (req, res) => {
    const id = req.params.id

    request.query(`SELECT * FROM student_profile WHERE id = ${id}`)
        .then(result => {
            if (result.recordset[0] == null) {
                res.status(400).json({ message: `Student with id = ${id} does not exist` })
            }
        })
        .catch((err => {
            console.log(`Error executing query: ${err}`)
            res.status(400).send(err)
        }))

    pool.request()
        .input('id', sql.Int, id)
        .execute('DeleteStudent')

        .then(() => {
            res.status(200).json({ message: "Student successfully eradicated" })
        })
        .catch((err => {
            console.log(`Error executing query: ${err}`)
            res.status(400).send(err)
        }))

})

module.exports = {
    approveProfile,
    deleteAlumnusProfile,
    deleteStudentProfile
}
