const asyncHandler = require('express-async-handler')
const { request } = require('../config/dbConfig')

//GET => 2
const getStudentProfile = asyncHandler(async (req, res) => {

    const id = req.params.id

    try {
        let result = await request
            .query(`SELECT * FROM student_profile WHERE id = ${id}`)

        res.status(200).json(result.recordset[0])
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//POST => 2
const createStudentProfile = asyncHandler(async (req, res) => {

    const id = req.body.id
    const password = req.body.password
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const sex = req.body.sex
    const degree = req.body.degree

    console.log(id, "\n", password, "\n", first_name, "\n", last_name, "\n", sex, "\n", degree)

    try {
        await request
            .input('id', sql.Int, id)
            .input('password', sql.VarChar(20), password)
            .input('first_name', sql.VarChar(20), first_name)
            .input('last_name', sql.VarChar(20), last_name)
            .input('sex', sql.Char(1), sex)
            .input('degree', sql.VarChar(20), degree)
            .execute('CreateStudentProfile')

        res.status(201).json({ message: "Student Profile added, waiting for admin approval" })

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//PUT => 2
const updateStudentProfile = asyncHandler(async (req, res) => {

    const id = req.body.id
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const sex = req.body.sex
    const degree = req.body.degree

    try {
        await request
            .query(`UPDATE student_profile 
                    SET first_name = ${first_name},
                        last_name = ${last_name},
                        sex = ${sex},
                        degree = ${degree}
                    WHERE id = ${id}`)

        res.status(200).json({ message: "Profile succesfully updated" })
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

module.exports = {
    getStudentProfile,
    createStudentProfile,
    updateStudentProfile
}
