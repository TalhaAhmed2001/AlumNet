const { config } = require("./dbConfig")
const sql = require("mssql")

const poolPromise = async (req, res) => {
  var result = "done"
  console.log("hello1")

  //console.log(config)
  const pool = new sql.ConnectionPool(config);
  return pool
  // pool.connect()
  //   .then(() => {
  //     console.log('Connected to SQL Server')
  //     //return pool
  //   })

  //   .catch(err => {
  //     console.log(`Database connection error: ${err}`)
  //     console.log("SQL Server connection cannot be established")
  //   });
}

module.exports = {
  poolPromise,
  sql,
}