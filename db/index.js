const { default: mongoose } = require("mongoose")

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/mern-practice"

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(
            `Conncected to Mongo! Database name: "${x.conncections[0].name}"`
        )
    })
    .catch((err) => console.log('Error connecting to mongo:', err))