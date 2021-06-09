const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let messageSchema = new Schema({
	userId : {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	message : {
		type: String,
		required:true
	}
})

module.exports = mongoose.model('messages',messageSchema);