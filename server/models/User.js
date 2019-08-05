let mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
	email:{type:String, required:true, unique:true},
	password:String,
	collections: [{type:mongoose.Schema.Types.ObjectId, ref:"Collection"}]
})

let User = mongoose.model("User", userSchema)

module.exports = User