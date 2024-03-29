const asyncHandler = require('express-async-handler')
const { pool, sql } = require('../config/dbConfig')
const bcrypt = require("bcrypt")

//POST => 3
const createAlumnusProfile = asyncHandler(async (req, res) => {

    const input_id = req.body.id
    const password = req.body.password
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const sex = req.body.sex
    const degree = req.body.degree
    const major = req.body.major
    const graduation = req.body.graduation
    
    //console.log(req.body)
    const image = req.file.path

    try {

        let hashed_password

        hashed_password = await bcrypt.hash(password, 12)

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
            .input('image', sql.VarChar(60), image)
            .execute('CreateAlumnusProfile')

        //console.log("count = ", result.returnValue)
        if (result.returnValue === 1) {
            return res.status(201).json({ message: "Alumnus Profile added, waiting for admin approval" })
        }
        else {
            return res.status(400).json({ message: `Profile with ID = ${input_id} already exists, please enter unique ID` })
        }

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        return res.status(500).send({ error: `Error executing query: ${err}` })
    }

})

//GET => 3
const getAlumnusProfile = asyncHandler(async (req, res) => {

    const pid = req.params.pid
    const token_id = req.userData.userERP

    console.log('pid = ' + pid)
    console.log('token_id = ' + token_id)

    let id;

    if (pid === undefined) {
        id = token_id
    }
    else {
        id = pid
    }

    console.log('hello' + id)
    try {

        const request = pool.request()

        const result = await request
            .input('id', sql.Int, id)
            .execute('GetAlumnus')

        if (result.recordset) {
            res.status(200).json(result.recordset[0])
        }
        else {
            res.status(400).json({ error: `Alumnus with id = ${id} does not exist` })
        }

    }
    catch (err) {
        console.log("error is this")
        console.log(`Error executing query: ${err}`)
        res.status(500).json({ error: `Error executing query: ${err}` })
    }

})

//PUT => 3
const updateAlumnusProfile = asyncHandler(async (req, res) => {

    const id = req.params.pid
    // const first_name = req.body.first_name
    // const last_name = req.body.last_name
    const sex = req.body.sex
    const degree = req.body.degree
    const major = req.body.major
    const graduation = req.body.graduation

    const token_id = req.userData.userERP

    if (id != token_id) {
        res.status(400).json({ error: "You are not authorized" })
    }

    try {

        const request = pool.request()

        await request
            .input('sex', sex)
            .input('degree', degree)
            .input('major', major)
            .input('graduation', graduation)
            .input('id', id)
            .query(`UPDATE alumni_profile 
            SET sex = @sex,
                degree = UPPER(@degree),
                major = @major,
                graduation = @graduation
            WHERE id = @id`)

        // await request
        //     .query(`UPDATE alumnus_profile 
        //             SET first_name = ${first_name},
        //                 last_name = ${last_name},
        //                 sex = ${sex},
        //                 degree = ${degree},
        //                 major = ${major},
        //                 graduation = ${graduation}
        //             WHERE id = ${id}`)

        res.status(200).json({ message: "Profile succesfully updated" })
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(500).send({ error: `Error executing query: ${err}` })
    }

})

//GET => 2,3
const getAlumniProfiles = asyncHandler(async (req, res) => {

    const curr_page = req.query.page || 1
    const page_size = 5
    const page = curr_page - 1 || 0
    const offset = page_size * page
    const degree = req.query.category
    const sort = req.query.sort

    let degree_query;
    let grad_query;

    if (degree != '') {
        degree_query = `WHERE degree = '${degree}'`
    }
    else {
        degree_query = ''
    }

    if (sort === 'grad asc') {
        grad_query = "graduation asc,"
    }
    else if (sort === 'grad desc') {
        grad_query = "graduation desc,"
    }
    else {
        grad_query = ''
    }

    //console.log(degree_query)
    let count

    try {

        const request = pool.request()

        let result = await request
            .query(`SELECT COUNT(*) AS count FROM alumni_profile ${degree_query}`)

        count = result.recordset[0].count
        //console.log('count' + count)
        count = Math.ceil(count / page_size)

        result = await request
            .query(`SELECT * FROM alumni_profile 
            ${degree_query}
            ORDER BY 
            ${grad_query}
            id asc OFFSET ${offset} ROWS FETCH NEXT ${page_size} ROWS ONLY;`)
        //.query(`SELECT * FROM alumni_profile ORDER BY id OFFSET ${offset} ROWS FETCH NEXT ${page_size} ROWS ONLY;`)

        const alumni = result.recordset

        res.status(200).json({
            totalPages: count,
            currentPage: curr_page,
            alumni
        })
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(500).send({ error: `Error executing query: ${err}` })
    }

})

//GET => 2,3
const getAlumniByName = async (req, res) => {

    const name = req.params.name

    try {

        const request = pool.request()

        let result = await request
            .input('name', name)
            .query(`SELECT * FROM alumni_profile 
            WHERE CONCAT(first_name, ' ', last_name) = UPPER(@name)`)

        // let result = await request
        //     .query(`SELECT * FROM alumni_profile 
        //                 WHERE CONCAT(first_name, ' ', last_name) = '${name}'`)

        console.log(result.recordset)
        res.status(200).json(result.recordset)
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(500).send({ error: `Error executing query: ${err}` })
    }

}

//GET => 3
const getAlumnusJobs = async (req, res) => {

    const pid = req.params.pid
    const token_id = req.userData.userERP

    console.log('pid = ' + pid)
    console.log('token_id = ' + token_id)

    let id;

    if (pid === undefined) {
        id = token_id
    }
    else {
        id = pid
    }

    try {

        const request = pool.request()

        const result = await request
            .input('id', sql.Int, id)
            .execute('GetAlumnusJobs')

        if (result.recordset) {
            res.status(200).json(result.recordset)
        }
        else {
            res.status(400).json({ message: `Alumnus with id = ${id} does not exist` })
        }

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(500).send({ error: `Error executing query: ${err}` })
    }

}

//POST => 3
const addJob = asyncHandler(async (req, res) => {

    const id = req.userData.userERP
    const employer = req.body.employer
    const role = req.body.role
    const date_start = req.body.date_start
    let date_end = req.body.date_end

    if (date_end == "" || date_end === undefined) {
        date_end = null
    }

    console.log(id, "\n", employer, "\n", role, "\n", date_start, "\n", date_end)

    try {

        const request = pool.request()

        const result = await request
            .input('id', sql.Int, id)
            .input('employer', sql.VarChar(20), employer)
            .input('role', sql.VarChar(20), role)
            .input('date_start', sql.Date, date_start)
            .input('date_end', sql.Date, date_end)
            .execute('AddJob')

        if (result.returnValue === 1) {
            return res.status(201).json({ message: "Job successfully added!" })
        }
        else {
            return res.status(400).json({ message: `Profile with ID = ${input_id} is not approved` })
        }

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(500).send({ error: `Error executing query: ${err}` })
    }

})

//PUT => 3
const updateJob = asyncHandler(async (req, res) => {

    const token_id = parseInt(req.userData.userERP)
    const id = req.body.id

    if (id != token_id) {
        res.status(400).json({ error: "You are not authorized" })
    }


    const job_id = req.body.job_id
    const date_start = req.body.date_start
    const date_end = req.body.date_end
    const employer = req.body.employer
    const role = req.body.role

    try {

        const request = pool.request()

        await request
            .input('date_end', date_end)
            .input('id', id)
            .input('date_start', date_start)
            .input('job_id', job_id)
            .input('employer', employer)
            .input('role', role)
            .query(`UPDATE job_desc 
            SET date_end = @date_end,
            date_start = @date_start,
            employer = @employer,
            role = @role
            WHERE id = @id AND job_id = @job_id`)

        // await request
        //     .query(`UPDATE job_desc 
        //             SET date_end = '${date_end}'
        //             WHERE id = '${id}' AND date_start = '${date_start}'`)

        res.status(200).json({ message: "Job succesfully updated" })

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(500).send({ error: `Error executing query: ${err}` })
    }

})

//DELETE => 3
const deleteJob = async (req, res) => {

    const id = req.userData.userERP //from token
    const job_id = req.params.jid

    try {

        const request = pool.request()

        console.log(id, job_id)

        await request
            .input('id', id)
            .input('job_id', job_id)
            .query(`DELETE FROM job_desc 
            WHERE id = @id AND job_id = @job_id`)
        // await request
        //     .query(`DELETE FROM job_desc 
        //             WHERE id = '${id}' AND date_start = '${date_start}'`)

        res.status(200).json({ message: "Job succesfully deleted" })

    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(500).send({ error: `Error executing query: ${err}` })
    }

}

module.exports = {
    createAlumnusProfile,
    getAlumnusProfile,
    updateAlumnusProfile,
    getAlumniProfiles,
    getAlumniByName,
    getAlumnusJobs,
    addJob,
    updateJob,
    deleteJob
}