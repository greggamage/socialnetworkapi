const router = require('express').Router()

router.use('/api',require('./reactionRoutes'))
router.use('/api',require('./thoughtRoutes'))
router.use('/api',require('./userRoutes'))

module.exports = router