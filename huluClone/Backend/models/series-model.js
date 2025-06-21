const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
    episode: {type: String, required: true},
    title: {type: String, required: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
});

const Series = new mongoose.model("Series", seriesSchema);
module.exports = Series;



