const { Schema, model } = require('mongoose');

const employeeSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    organizationId: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    }
}, {versionKey: false});

module.exports = model('Employee', employeeSchema);
