const express = require("express");

const { createAdvices, getAdviceById, getAdvices, getAllAdvices, updateAdvices, deleteAdvices, likeAdvice, getLikedAdvices } = require('../controllers/adviceController');
const checkAuth = require("../middleware/check-auth");
const { authPermission } = require("../middleware/check-permission");
const { validateAdvices } = require("../middleware/validation");

const router = express.Router();


router.use(checkAuth);

router.get("/", authPermission("getAdvices"), getAllAdvices)

router.get("/alumni", authPermission("getAdvices"), getAdvices)
router.get("/alumni/:ERP", authPermission("getAdvices"), getAdvices)
router.get("/alumnus/:aid", authPermission("getAdvices"), getAdviceById)

router.patch("/like/:aid", authPermission("getAdvices"), likeAdvice)
router.get("/likedadvices", authPermission("getAdvices"), getLikedAdvices)

router.post("/", authPermission("createAdvices"), validateAdvices, createAdvices)
router.patch("/:aid", authPermission("updateAdvices"), validateAdvices, updateAdvices)
router.delete("/:aid", authPermission("deleteAdvices"), deleteAdvices)


module.exports = router;