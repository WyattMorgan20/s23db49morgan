const mongoose = require("mongoose")
const tankSchema = mongoose.Schema({
    year: {type: Number, min: 1910, max: 2023},
    country: String,
    name: String
})
module.exports = mongoose.model("Tank", tankSchema)