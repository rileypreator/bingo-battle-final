var mongoose = require('mongoose');

const BingoChoiceSchema = mongoose.Schema({
    id: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model('BingoChoice', BingoChoiceSchema);