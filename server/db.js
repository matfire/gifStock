const mongoose = require("mongoose")

mongoose.connect("mongodb://matteo:Galako99!!@ds261096.mlab.com:61096/gifstock")


let db = mongoose.connection



module.exports = db