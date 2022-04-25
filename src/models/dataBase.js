const mongoose = require("mongoose")

const MoisturesSchema = new mongoose.Schema(
    {
        moistures: Number
    }
)

module.exports = mongoose.model("Moistures", MoisturesSchema)