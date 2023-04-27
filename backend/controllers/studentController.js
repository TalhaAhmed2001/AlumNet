const asyncHandler = require('express-async-handler')
const { pool, sql } = require('../config/dbConfig')
const bcrypt = require("bcrypt")

//POST => 2
const createStudentProfile = asyncHandler(async (req, res) => {

    const id = req.body.id
    const password = req.body.password
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const sex = req.body.sex
    const degree = req.body.degree

    try {

        let hashed_password

        hashed_password = await bcrypt.hash(password, 12)

        console.log(id, "\n", hashed_password, "\n", first_name, "\n", last_name, "\n", sex, "\n", degree)

        const request = pool.request()

        const result = await request
            .input('id', sql.Int, id)
            .input('password', sql.VarChar(60), hashed_password)
            .input('first_name', sql.VarChar(20), first_name)
            .input('last_name', sql.VarChar(20), last_name)
            .input('sex', sql.Char(1), sex)
            .input('degree', sql.VarChar(20), degree)
            .execute('CreateStudentProfile')

        if (result.returnValue === 1) {
            res.status(201).json({ message: "Student Profile added, waiting for admin approval" })
        }
        else {
            res.status(400).json({ message: `Profile with ID = ${id} already exists, please enter unique ID` })
        }

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//PATCH => 2
const requestPromotion = async (req, res) => {

    const id = req.userData.userERP

    try {

        const request = pool.request()

        const result = await request
            .query(`UPDATE student_profile
                SET promote = 'true'
                WHERE id = ${id}`)

        res.status(200).json({ message: "Alumnus Promotion reqeusted!" })
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }
}

//GET => 1
const getPromotingStudents = async (req, res) => {

    try {

        const request = pool.request()

        const result = await request
            .query(`SELECT id FROM student_profile WHERE promote='true'`)

        res.status(200).json(result.recordset)

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }
}

//PATCH => 2
const updateStudentProfile = async (req, res) => {

    const id = req.userData.userERP
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const sex = req.body.sex
    const degree = req.body.degree

    try {

        const request = pool.request()

        await request
            .input('first_name', first_name)
            .input('last_name', last_name)
            .input('sex', sex)
            .input('degree', degree)
            .input('id', id)
            .query(`UPDATE student_profile 
            SET first_name = @first_name,
                last_name = @last_name,
                sex = @sex,
                degree = @degree,
            WHERE id = @id`)


        res.status(200).json({ message: "Profile succesfully updated" })
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

}

//GET => 2
const getPromotion = async(req,res)=>{

    const id = req.userData.userERP

    try{

        const request = pool.request()

        const result = await request
            .query(`SELECT promote FROM student_profile WHERE id = @id`)

        res.status(200).json(result.recordset[0])
    }
    catch(err){
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }
}

module.exports = {
    createStudentProfile,
    requestPromotion,
    getPromotingStudents,
    updateStudentProfile,
    getPromotion
}