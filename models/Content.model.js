const {Schema,model} = require('mongoose')

const contentSchema = new Schema(
    {
        title: String,
        description: String
    }
)

const Content = model('Content', contentSchema)

module.exports = Content