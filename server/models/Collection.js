let mongoose = require("mongoose")


let CollectionSchema = new mongoose.Schema({
	name:String,
	gifs:[{name:String, url:String}]
})

let Collection = mongoose.model("Collection", CollectionSchema)

module.exports = Collection