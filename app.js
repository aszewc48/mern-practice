require("dotenv/config")
require("./db")
const express = require("express")
const cors = require('cors')
const app = express()
app.use(cors({
    origin: [process.env.FRONTEND_URL]
}))
require("./config")(app)
const capitalized = require("./utils/capitalized")
const projectName = "mern-practice"

app.locals.appTitle = `${capitalized(projectName)} created from scratch`
const {isAuthenticated} = require('./middlewares/jwt.middleware')

const index = require("./routes/index.routes")
const authRoutes = require("./routes/auth.routes")

app.use("/", index)
app.use("/auth", authRoutes)

require("./error-handling")(app)

module.exports = app