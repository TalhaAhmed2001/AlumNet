const asyncHandler = require('express-async-handler')
const Advice = require('../models/adviceModel')
const Stories = require('../models/storiesModel')
const { pool, sql } = require('../config/dbConfig')
const bcrypt = require("bcrypt")

//POST => 3
const createAlumnusProfile = asyncHandler(async (req, res) => {

    const input_id = req.body.erp
    const password = req.body.password
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const sex = req.body.sex
    const degree = req.body.degree
    const major = req.body.major
    const graduation = req.body.graduation

    try {

        let hashed_password
    
        hashed_password = await bcrypt.hash(password,12)
    
        console.log(input_id, "\n", hashed_password, "\n", first_name, "\n", last_name, "\n", sex, "\n", degree, "\n", major, "\n", graduation)

        const request = pool.request()

        result = await request
            .input('password', sql.VarChar(60), hashed_password)
            .input('id', sql.Int, input_id)
            .input('first_name', sql.VarChar(20), first_name)
            .input('last_name', sql.VarChar(20), last_name)
            .input('sex', sql.Char(1), sex)
            .input('degree', sql.VarChar(10), degree)
            .input('major', sql.VarChar(20), major)
            .input('graduation', sql.Int, graduation)
            .execute('CreateAlumnusProfile')

        //console.log("count = ", result.returnValue)
        if (result.returnValue === 1){
            return res.status(201).json({ message: "Alumnus Profile added, waiting for admin approval" })
        }
        else {
            return res.status(400).json({ message: `Profile with ID = ${input_id} already exists, please enter uniqure ID` })
        }

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        return res.status(400).send(err)
    }

})

//GET => 3
const getAlumnusProfile = asyncHandler(async (req, res) => {

    const id = req.params.id //from token

    try {

        const request = pool.request()

        const result = await request
            .query(`SELECT * FROM alumni_profile WHERE id = ${id} AND status = 'Approved'`)

        res.status(200).json(result.recordset[0])

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//PUT => 3
const updateAlumnusProfile = asyncHandler(async (req, res) => {

    const id = req.body.id //from token
    const first_name = req.body.first_name //from token
    const last_name = req.body.last_name
    const sex = req.body.sex
    const degree = req.body.degree
    const major = req.body.major
    const graduation = req.body.graduation

    try {

        const request = pool.request()

        await request
            .query(`UPDATE alumnus_profile 
                    SET first_name = ${first_name},
                        last_name = ${last_name},
                        sex = ${sex},
                        degree = ${degree},
                        major = ${major},
                        graduation = ${graduation}
                    WHERE id = ${id}`)

        res.status(200).json({ message: "Profile succesfully updated" })
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//GET => 2,3
const getProfileJobsStoriesAdvice = asyncHandler(async (req, res) => {

    const id = req.params.id

    let profile
    let jobs
    let advice
    let stories

    try {
        
        const request = pool.request()

        let result = await request
            .query(`SELECT * FROM alumnus_profile WHERE id = ${id} AND status = 'Approved'`)

        profile = result.recordset

        result = await request
            .query(`SELECT * FROM job_desc WHERE id = ${id}`)

        jobs = result.recordset

        advice = Advice.find({ ERP: req.params.id })
        stories = Stories.find({ ERP: req.params.id })

        const alumnus = { profile, jobs, advice, stories }

        res.status(200).json(alumnus)

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//GET => 2,3
const getAlumniProfiles = asyncHandler(async (req, res) => {

    try {
        
        const request = pool.request()

        let result = await request
            .query('SELECT * FROM alumni_profile')

        res.status(200).json(result.recordset)
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//POST => 3
const addJob = asyncHandler(async (req, res) => {

    const id = req.body.id //from token
    const employer = req.body.employer
    const role = req.body.role
    const date_start = req.body.date_start
    const date_end = req.body.date_end

    console.log(id, "\n", employer, "\n", role, "\n", date_start, "\n", date_end)

    try {
        
        const request = pool.request()

        const result = await request
            .input('id', sql.Int, id)
            .input('employer', sql.VarChar(20), id)
            .input('role', sql.VarChar(20), role)
            .input('date_start', sql.Date, date_start)
            .input('date_end', sql.Date, date_end)
            .execute('AddJob')

            if (result.returnValue === 1){
                return res.status(201).json({ message: "Job successfully added!" })
            }
            else {
                return res.status(400).json({ message: `Profile with ID = ${input_id} is not approved` })
            }

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

//PATCH => 3
const updateJob = asyncHandler(async (req, res) => {

    const id = req.params.id //from token
    const date_start = req.params.date_start
    const date_end = req.params.date_end

    try {
        
        const request = pool.request()

        await request
            .query(`UPDATE job_desc 
                    SET date_end = ${date_end} 
                    WHERE id = ${id} AND date_start = ${date_start}`)

        res.status(200).json({ message: "Job succesfully updated" })

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }

})

module.exports = {
    createAlumnusProfile,
    getAlumnusProfile,
    updateAlumnusProfile,
    getProfileJobsStoriesAdvice,
    getAlumniProfiles,
    addJob,
    updateJob
}