const express = require('express')
const {create} = require('../models/User.model')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {isAuthenticated} = require('../middlewares/jwt.middleware')

const User = require('../models/User.model')

router.post('/signup', (req,res,next) => {
    const {email,username,password,confirmPassword} = req.body
    if(!email || !username || !password || !confirmPassword){
        res.json({error: 'Inputs required'})
        return
    }
    if(password !== confirmPassword){
        res.json({error: 'Passwords must match'})
    }
    User.findOne({username})
    .then(foundUser => {
        if(foundUser){
            res.json({error: 'Username already exists'})
            return
        }
    User.findOne({email})
    .then(foundEmail => {
        if(foundEmail){
            res.json({error: 'Email already exists'})
            return
        }
    })
    User.create({
        email,
        username,
        password: bcryptjs.hashSync(password)
    })
    .then(createdUser => res.json({user: createdUser}))
    .catch(err => {
        console.log('Error creating user', err)
        res.json({error: 'Error creating user', err})
    })
    .catch(err => {
        console.log('Error validating email', err)
        res.json({error: 'Error validating email'})
    })
    .catch(err => {
        console.log('Error validating username', err)
        res.json({error: 'Error validating username'})
    })
    })
})

router.post('/login', (req,res,next) => {
    const {email,username,password} = req.body
    if(!email || !password) {
        res.json({error: 'Email and password required'})
        return
    }
    User.findOne({email})
        .then(foundUser => {
            if(!foundUser){
                res.json({error: 'invalid email or password'})
                return
            }
            const isValidPassword = bcryptjs.compareSync(password, foundUser.password)
            if(!isValidPassword){
                res.json({error: 'Invalid email or password'})
                return
            }
            const payload = {
                email: foundUser.email,
                _id: foundUser._id
            }
            const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                expiresIn: '6h',
                algorithm: 'HS256'
            })
            res.json({authToken})
        })
        .catch(err => {
            console.log(err)
            res.json({error: err})
        })
})

router.get('/verify', isAuthenticated, (req,res,next) => {
    console.log('Token Payload:', req.payload)
    res.json(req.payload)
})

module.exports = router