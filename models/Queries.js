const mongoose = require("mongoose");

const queriesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Queries = mongoose.model("Queries", queriesSchema);

module.exports = Queries;
