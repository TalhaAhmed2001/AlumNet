//SQL controller
const asyncHandler = require('express-async-handler')

//GET
const getLogin = asyncHandler(async (req, res) => {
    const id = req.params.id

    //get login info from db for admin 
    //permissibilty->admin 

    res.status(200)
})

//POST
const createAccount = asyncHandler(async (req, res) => {
    if (!req.body.id) {
        res.status(400)
        throw new Error("Please enter ERP")
    }
    if (!req.body.password) {
        res.status(400)
        throw new Error("Please enter password")
    }

    //create login profile + waiting to be approved
    //permissibilty->alumni+student 

    res.status(201)
})

//PATCH
const approveAccount = asyncHandler(async (req, res) => {
    const id = req.params.id
    //update status from pending to approved 
    //permissibilty->admin 

    res.status(200)
})

module.exports = {
    getLogin,
    createAccount,
    approveAccount
}
