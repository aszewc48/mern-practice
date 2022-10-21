const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon')
const path = require('path')
const { urlencoded } = require('express')

module.exports = (app) => {
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cookieParser())

}