const { Schema, model } = require('mongoose');

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    address: {
        type: String,
        default: '',
    },
    logo: {
        type: String,
        default: null,
    },
    images: {
        type: Array,
        default: [],
    },
    discounts: {
        type: Array,
        default: [],
        // must be an object like { for: id, percent: 5 }
    }
}, {versionKey: false});

module.exports = model('Organization', organizationSchema);
