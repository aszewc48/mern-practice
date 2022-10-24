const router = require("express").Router()
const axios = require('axios')
const {isAuthenticated} = require('../middlewares/jwt.middleware')
const Content = require("../models/Content.model")

router.get('/', (req,res,next) => {
    res.render('index')
})

router.post ('/create', (req,res,next) => {
    const {title,description} = req.body
    Content.create({
        title,
        description
    })
    .then(contentData => res.json({message: 'POST success', content: contentData}))
    .catch(err => console.log(err))
})

router.get('/read', (req,res,next) => {
    Content.find()
        .then(contentData => res.json({message: 'GET success', content: contentData}))
        .catch(err => console.log(err))
})

router.put('/update/:contentId', (req,res,next) => {
    const contentId = req.params
    const {title,description} = req.body
    Content.findByIdAndUpdate(contentId, {
        title,
        description
    })
        .then(contentData => res.json({message: 'PUT success', content: contentData}))
        .catch(err => console.log(err))
})

router.delete('/delete/:contentId', (req,res,next) => {
    const contentId = req.params
    const {title, description} = req.body
    Content.findByIdAndRemove(contentId)
        .then(contentData => res.json({message: 'DELETE success', contentId, content: contentData}))
        .catch(err => console.log(err))
})

module.exports = router