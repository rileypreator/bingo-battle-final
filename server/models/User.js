var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: {type: String, required: true},
    games: [{type: mongoose.Schema.Types.ObjectId, ref: 'SingleGame'}]
});

module.exports = mongoose.model('User', UserSchema)