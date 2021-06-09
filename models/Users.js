const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt');
let userSchema = new Schema({
	name:{
		type: String,
		required:true
	},
	username : {
		type :  String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required: true,
	}

})
userSchema.pre('save',async function(next)
{
	let salt = await bcrypt.genSalt();
	this.password =  await bcrypt.hash(this.password,salt);
	next();
})
module.exports = mongoose.model('users',userSchema);