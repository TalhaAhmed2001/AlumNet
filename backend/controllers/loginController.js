const { pool } = require('../config/dbConfig')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

//POST => 1,2,3
const login = async (req, res) => {

    const id = req.body.id
    const password = req.body.password
    JWT_KEY = "supersecret_dont_share";

    try {

        const request = pool.request()

        let result = await request
            .query(`SELECT password,user_id,status FROM login_cred where id=${id}`)

        if (result.recordset[0] == null) {
            res.status(400).json({ error: "Incorrect ID" })
        }
        else {

            let status = result.recordset[0]['status']
            let hashed_password = result.recordset[0]['password']
            let user_id = result.recordset[0]['user_id']
            let valid = await bcrypt.compare(password, hashed_password)

            console.log(id, password, status, hashed_password, user_id, valid)

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

                    // result = await request
                    //     .query(`SELECT first_name, last_name FROM ${table} where id=${id}`)
                    result = await request
    .input('id', id)
    .query(`SELECT first_name, last_name FROM ${table} where id=@id`)
                    first_name = result.recordset[0]['first_name']
                    last_name = result.recordset[0]['last_name']
                }
                else if (user_id === 1) {
                    first_name = 'sysadmin'
                    last_name = ''
                }

                if (status == "Pending") {
                    return res.status(200).json({ message: "Profile waiting to be approved..." })
                }

                let token;
                token = jwt.sign(
                    {
                        ERP: id,
                        name: `${first_name} ${last_name}`,
                        userRole: user_id
                    },
                    JWT_KEY,
                    { expiresIn: "1h" }
                )

                return res.json({
                    erp: id,
                    user_id: user_id,
                    name: `${first_name} ${last_name}`,
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
}

module.exports = {
    login
}