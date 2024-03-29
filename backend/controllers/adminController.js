const asyncHandler = require("express-async-handler")
const Advice = require('../models/adviceModel')
const Stories = require('../models/storiesModel')
const { pool, sql } = require('../config/dbConfig')

//GET
const getPendingProfiles = async (req, res) => {

    try {

        const request = pool.request()

        const result = await request
            //.query(`SELECT id, user_id FROM login_cred WHERE status='Pending'`)
            .query(`SELECT id,
                         user_role 
                    FROM login_cred
                    INNER JOIN user_group 
                    ON login_cred.user_id = user_group.user_id
                    WHERE status='Pending'`)

        res.status(200).json(result.recordset)

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(500).send(err)
    }

}

//GET
const getApprovedProfiles = async (req, res) => {

    try {

        const request = pool.request()

        const result = await request
            //.query(`SELECT id, user_id FROM login_cred WHERE status='Pending'`)
            .query(`SELECT id,
                         user_role 
                    FROM login_cred
                    INNER JOIN user_group 
                    ON login_cred.user_id = user_group.user_id
                    WHERE status='Approved' 
                    AND login_cred.user_id != 1`)

        res.status(200).json(result.recordset)

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(500).send(err)
    }

}

//PUT
const promoteStudent = async (req, res) => {

    const id = req.params.id

    try {

        const request = pool.request()

        await request
            .input('id', sql.Int, id)
            .execute('PromoteStudent')

        res.status(200).json({ message: "Student Promoted" })
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }


}

//PATCH
const approveProfile = asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id)
    console.log("hello i am here")

    try {

        const request = pool.request()

        await request
            .input('id', sql.Int, id)
            .execute('ApproveProfile')

        res.status(200).json({ message: `Profile with ID = ${id} successfully approved` })
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//DELETE
const declineProfile = async (req, res) => {

    const id = parseInt(req.params.id)
    //console.log(req.params.id)

    try {

        const request = pool.request()

        await request
            .input('id', sql.Int, id)
            .execute('DeclineProfile')


        res.status(200).json({ message: `Profile with ID = ${id} successfully declined` })


    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }
}

//DELETE 
const deleteAlumnusProfile = asyncHandler(async (req, res) => {

    const id = req.params.id

    try {

        const request = pool.request()

        const result = await request
            .input('id', sql.Int, id)
            .execute('DeleteAlumnus')

        if (result.returnValue === 1) {
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

        if (result.returnValue === 1) {
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
    getPendingProfiles,
    getApprovedProfiles,
    approveProfile,
    promoteStudent,
    deleteAlumnusProfile,
    deleteStudentProfile,
    declineProfile
}
