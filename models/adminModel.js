const {ADMIN_STATUS} = require('../utils/constants');
const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    organizationId: {
        type: String,
        default: '',
    },
    status: {
        type: Number,
        required: true,
    }
}, {versionKey: false});

module.exports = model('Admin', adminSchema);