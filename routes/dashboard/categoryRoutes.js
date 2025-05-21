const categoryController = require('../../controllers/dashboard/categoryController')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const router = require('express').Router()

router.post('/admin-login',authMiddleware, categoryController.add_category)

module.exports = router