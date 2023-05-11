const express = require("express");

const { createAdvices, getAdviceById, getAdvices, getAllAdvices, updateAdvices, deleteAdvices } = require('../controllers/adviceController');
const checkAuth = require("../middleware/check-auth");
const { authPermission } = require("../middleware/check-permission");
const { validateAdvices } = require("../middleware/validation");

const router = express.Router();


router.use(checkAuth);

router.get("/", authPermission("getAdvices"), getAllAdvices)

router.get("/alumni", authPermission("getAdvices"), getAdvices)
router.get("/alumni/:ERP", authPermission("getAdvices"), getAdvices)
//router.get("/:aid(\\d+)", authPermission("getAdvices"), getAdviceById)

router.post("/", authPermission("createAdvices"), validateAdvices, createAdvices)
router.patch("/:aid", authPermission("updateAdvices"), validateAdvices, updateAdvices)
router.delete("/:aid", authPermission("deleteAdvices"), deleteAdvices)


module.exports = router;