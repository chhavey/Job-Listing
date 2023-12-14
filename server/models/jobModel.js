const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    jobPosition: {
        type: String,
        required: true
    },
    monthlySalary: {
        type: Number,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    workSetting: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('Job', jobSchema);