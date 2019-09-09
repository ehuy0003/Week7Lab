let mongoose = require('mongoose');

let developerSchema = mongooseSchema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                if (value === 'BEGINNER' || value === 'EXPERT') {
                    return true;
                } else 
                    return false
            },
            message: 'Has to be either BEGINNER or EXPER'
        }
    },
    address: {
        address: String,
        state: String,
        suburb: String,
        street: String,
        unit: Number
    }
});

let developerModel = mongoose.model('DeveloperCollection',developerSchema);
module.exports = developerModel;