var mongoose = require('mongoose');

var PinSchema = mongoose.Schema({
	title: String,
	created: Date,
	img: String, //0 - 10 user rating,
	desc: {type: String, maxlength: 50},
	likes: {type: Number, default: 0},
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PinComment' }],
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	deleted: {type: Boolean, default: true}
	// ,
	// userlikes: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	// userdislikes: type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Pin', PinSchema);
