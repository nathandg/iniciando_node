const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        role: String
    }
)

module.exports = mongoose.model("Users", UsersSchema)