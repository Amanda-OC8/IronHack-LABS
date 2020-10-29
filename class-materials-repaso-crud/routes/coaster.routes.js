const express = require('express')
const router = express.Router()

const Coaster = require("../models/coaster.model")
const Park = require("../models/park.model")


router.get("/", (req, res, next) => {
    
    Coaster.find()
        .populate("park") //Esto me permite tener el objeto park con toda la información del objeto para meter como un segundo objeto al render (luego hay que especificarle las propiedades a mostrar)
        .then(allCoasters => res.render("coasters/coasters-index", { allCoasters }))
        .catch(err => next(err))  
})

//Renderizo e inyecto al formulario con un each el id y el name de los parques
router.get("/new", (req, res, next) => {
    Park.find()
        .then(allParks => res.render("coasters/new-coaster", { allParks }))
        .catch(err => next(err))    
})

router.post("/new", (req, res, next) => {
    const { name, description, inversions, length, active, park } = req.body

    Coaster.create({ name, description, inversions, length, active, park })
        .then(() => res.redirect("/"))
        .catch(err => next(err))
   
})

router.get("/delete", (req, res, next) => {
    const coasterId = req.query.id
   
    Coaster.findByIdAndDelete(coasterId)
        .then(() => res.redirect("/"))
        .catch(err=> next(err))
})

router.get("/edit", (req, res, next) => {

    const coasterId = req.query.id

    Coaster.findById(coasterId, function (err, result) {
        Park.find(function (err, results) {
            res.render('coasters/edit-coaster', { title: 'Coaster Details', coaster: result, parks: results })
        })
    })

})

router.post("/edit", (req, res, next) => {

    const coasterId = req.query.id

    const { name, description, inversions, length, active, park } = req.body

    if (name === "" || description === "" || inversions === "" || length === "" || active === "Seleccionar" || park === "Seleccionar") {
        Coaster.findById(coasterId, function (err, result) {
            Park.find(function (err, results) {
                res.render('coasters/edit-coaster', { title: 'Coaster Details', coaster: result, parks: results, message: "Debes rellenar todos los campos" })
            })
        })

   }
    Coaster.findById(coasterId, function (err, result) {
        Park.find(function (err, results) {
            res.render('coasters/edit-coaster', { title: 'Coaster Details', coaster: result, parks: results })
        })
    })

    // Coaster.findByIdAndUpdate(coasterId, { name, description, inversions, length, active, park})
    //     .then(() => res.redirect("/"))
    //     .catch(err => next(err))
})



router.get("/details/:id", (req, res, next) => {

    const coasterId = req.params.id

    Coaster.findById(coasterId)
        .populate("park")
        .then(foundCoaster => res.render("coasters/coaster-details", foundCoaster))
        .catch(err => next(new Error(err)))

})



module.exports = router