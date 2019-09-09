let mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    // name: String,
    // assign: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 
    // },
    // due: Date,
    // status: {
    //     type: String,
    //     validate: {
    //         validator(value) {
    //             if (value === 'InProgress' || value === 'Complete' ) {  
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //             message: 'Should be either InProgress or Complte'
    //         }
    //     }
    // },
    // desc: String
});

let taskModel = mongoose.model('TaskCollection',taskSchema);
module.exports = taskModel;