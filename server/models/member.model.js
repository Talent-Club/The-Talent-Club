const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;


const MemberSchema = new Schema({
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
    password: {
        type: String,
        required: true
    },
    isMember: Boolean,
    hasPaid: Boolean,
    activatedSlack: Boolean,
    socialNetworks: [{
        name: String,
        url: String
    }],
    stripeCharge: { type: Object }
});

MemberSchema.pre('save', hashPassword);
MemberSchema.methods.comparePassword = comparePassword;



function hashPassword(next) {
    if(this.isModified('password') || this.isNew) {
        bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(this.password, salt))
            .then(hash => this.password = hash)
            .then(next)
            .catch(err => next(err));
    } else {
        return next();
    }
}

function comparePassword(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Member', MemberSchema);
