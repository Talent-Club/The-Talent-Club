const mongoose = require('mongoose');

const Member = mongoose.model('Member', {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    username: String,
    password: {
        type: String,
        required: true
    },
    isMember: Boolean,
    jobTitle: String,
    hasPaid: Boolean,
    activatedSlack: Boolean,
    socialNetworks: [{
        name: String,
        url: String
    }],
    stripeCharge: { type: Object, required: true }
});

module.exports = Member;
