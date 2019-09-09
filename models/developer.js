let mongoose = require('mongoose');

let developerSchema = mongooseSchema({
    // name: an object has
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    // Level: String and can be either ‘Beginner or Expert’. (required and should be saved in all caps)
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
    // Address: Object has
    // State
    // Suburb
    // Street
    // Unit
    
});

let developerModel = mongoose.model('DeveloperCollection',developerSchema);
module.exports = developerModel;