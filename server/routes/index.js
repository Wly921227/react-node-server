import express from 'express'

const router = express.Router()

router.get('/', function (req, res) {
    res.render('index', {
        root: 'Express Server'
    })
})

module.exports = router