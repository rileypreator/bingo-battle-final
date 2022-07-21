var mongoose = require('mongoose');

const SingleGameSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    bingoChoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroupChoice'}]
});

module.exports = mongoose.model('SingleGame', SingleGameSchema)