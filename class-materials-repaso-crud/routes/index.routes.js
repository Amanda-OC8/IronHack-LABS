const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.render('index'))
router.get('/parks', require("./park.routes.js"))
router.get('/coasters', require("./coaster.routes.js"))



module.exports = router