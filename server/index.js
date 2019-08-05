const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const db = require("./db")
const jwt = require("jsonwebtoken")
const middleware = require("./middleware")
const config = require("./config")
const User = require("./models/User")
const Collection = require("./models/Collection")

db.once("open", () => console.log("connected to db"))


const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json())



app.post("/register/local", async(req, res) => {
	let {email, password} = req.body
	let user = await User.findOne({email})
	if (user) {
		res.status(500).json({status:"danger", msg:"user already exists"})
	} else {
		let encryptedPassword = bcrypt.hashSync(password, 12)
		User.create({email, password:encryptedPassword}).then(user => {
			res.json({status:"success", msg:"user created successfully, you can now sign in"})
		})
	}
})

app.post("/authenticate/local", async(req, res) => {
	let {email, password} = req.body
	let user = await User.findOne({email})
	if (user) {
		if (bcrypt.compareSync(password, user.password)) {
			let token = jwt.sign({id:user._id}, config.secret, {expiresIn:"24h"})
			res.json({status:"success", msg:"signed in successfully; welcome back!", token, user})
		}
	} else {
		res.json({status:"danger", msg:"user with entered credentials does not exist"})
	}
})


app.listen(4000, () => console.log("listening on port 4000"))