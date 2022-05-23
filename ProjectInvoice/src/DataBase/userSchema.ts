const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {type:String, required: true},
    password: {type:String, required: true, minLenght:10}
})

const User = mongoose.model('user', userSchema)

module.exports = User
