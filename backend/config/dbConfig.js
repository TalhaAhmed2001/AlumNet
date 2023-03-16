const sql = require('mssql')
require('dotenv').config()

const config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: "AlumNet",
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedconnection: false,
        enableArithAbort: true,
        instancename: "SQLEXPRESS",
    },
    port: 1433
};

const pool = new sql.ConnectionPool(config)

const connectSQL = async () => {
    pool.connect(async err => {
        if (err) {
            console.error('Error connecting to SQL Server', err);
        } else {
            console.log("SQL Server connection established successfully")
        }
    }
    )
}

module.exports = {
    connectSQL,
    pool,
    sql
}
