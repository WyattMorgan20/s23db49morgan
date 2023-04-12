const mongoose = require("mongoose")
const tankSchema = mongoose.Schema({
    year: Number,
    country: String,
    name: String
})
module.exports = mongoose.model("Tank",
tankSchema)