const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4;
console.log(uuid);
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid
    },
    userName:
    {
        type: String
    },
    password: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }

})
const admin = mongoose.model('Admin', userSchema);
module.exports = admin;