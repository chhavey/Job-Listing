const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel');
const requireAuth = require('../middlewares/requireAuth');
const errorHandler = require('../middlewares/errorHandler');

router.post('/job-post', requireAuth, async (req, res, next) => {
    const { companyName, logo, jobPosition, monthlySalary, jobType, workSetting, location, description, about, skills, information } = req.body;
    let skillsArray = skills;
    if (typeof skills === 'string') {
        skillsArray = skills.split(',').map(skill => skill.trim());
    }

    try {
        const jobPost = new Job({
            companyName,
            logo,
            jobPosition,
            monthlySalary,
            jobType,
            workSetting,
            location,
            description,
            about,
            skills: skillsArray,
            information
        });
        await jobPost.save();

        return res.json({
            status: 'SUCCESS',
            message: 'Job post created successfully.'
        })
    }
    catch (error) {
        next(errorHandler(res, error));
    }
});

module.exports = router;