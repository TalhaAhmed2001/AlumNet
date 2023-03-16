const { pool } = require('../config/dbConfig')
const bcrypt = require("bcrypt.js")
const jwt = require('jsonwebtoken')

//GET => 1,2,3
const login = asyncHandler(async (req, res) => {
    const id = req.body.id
    const password = req.body.password

    try {
        
        const request = pool.request()

        const result = await request
            .query(`SELECT password,user_id FROM login_cred where id=${id}`)

        if (result.recordset[0] != null) {
            res.status(400).json({ error: "Incorrect ID" })
        }
        else {

            const hashed_password = result.recordset[0]['password']
            const user_id = result.recordset[0]['user_id']
            const valid = await bcrypt.compare(password, hashed_password)

            if (valid) {
                res.status(200)

                let table
                let first_name
                let last_name

                if (user_id === 2 || user_id === 3) {
                    if (user_id === 2) {
                        table = 'student_profile'
                    }
                    else {
                        table = 'alumni_profile'
                    }

                    result = await request
                        .query(`SELECT first_name, last_name FROM ${table} where id=${id}`)
                    first_name = result.recordset[0]['first_name']
                    last_name = result.recordset[0]['last_name']
                }
                else if (user_id === 1) {
                    first_name = 'sysadmin'
                    last_name = ''
                }

                const token = jwt.sign(
                    {
                        erp: id,
                        user_id: user_id,
                        first_name: first_name,
                        last_name: last_name,
                    },
                    process.env.JWT_KEY,
                    { expiresIn: "1h" }
                )

                res.json({
                    erp: id,
                    user_id: user_id,
                    first_name: first_name,
                    last_name: last_name,
                    token: token,
                });
            }
            else {
                res.status(400).json({ error: "Incorrect Password" })
            }
        }
    }
    catch (err) {
        console.log(`Error executing query: ${err}`)
        res.status(400).send(err)
    }
})

module.exports = {
    login
}
