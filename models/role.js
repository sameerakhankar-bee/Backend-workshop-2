const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    name: String,
    description: String,
}, {
    timestamps: true,
    collection: 'roles',
});

const role = mongoose.model('role', roleSchema);
module.exports = role;