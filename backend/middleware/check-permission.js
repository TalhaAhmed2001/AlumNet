const jwt = require("jsonwebtoken");
const {  pool } = require('../config/dbConfig')

const authPermission = (permission) => {
    return async (req,res,next)=>{
        if (req.method === "OPTIONS") {
            return next();
          }
          try {
            JWT_KEY = "supersecret_dont_share"
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, JWT_KEY);
            // req.userData = { userERP: decodedToken.ERP, userName: decodedToken.name, userRole: decodedToken.userRole };
            console.log(permission,token, decodedToken)
           
            const request = pool.request()

                const result = await request
                    .query(`SELECT ${permission} FROM user_group WHERE user_id = ${decodedToken.userRole}`)

                    console.log(result)
        
                if(result.recordset[0][permission] === "Y"){
                    console.log("Permission granted")
                    next();
                }
                else{
                    res.json("You are not authorized to access this")
                }

          } catch (err) {
            console.log("Permission failed")
            return next(err);
          }
    }
}

module.exports = {authPermission};