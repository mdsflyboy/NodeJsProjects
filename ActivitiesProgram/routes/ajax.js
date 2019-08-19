const router = require('express').Router();

router.use('/residents', require('./residents'));
router.use('/activityTypes', require('./activityTypes'));

module.exports = router;