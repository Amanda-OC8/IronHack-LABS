const express = require('express')
const router = express.Router()

const Park = require("../models/park.model")

router.get("/", (req, res) => res.render("parks/index-park"))

router.get("/new", (req, res) => res.render("parks/new-park"))
router.post("/new", (req, res, next) => {
    const { name, description, active} = req.body

    Park.create({ name, description, active })
        .then(() => res.redirect("/"))
        .catch(err => next(err))
})


module.exports = router