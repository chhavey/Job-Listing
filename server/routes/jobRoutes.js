const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel');
const requireAuth = require('../middlewares/requireAuth');
const errorHandler = require('../middlewares/errorHandler');

router.post('/job-post', requireAuth, async (req, res) => {
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
        errorHandler(res, error);
    }
});

router.put('/job-post/:id', requireAuth, async (req, res) => {
    const { companyName, logo, jobPosition, monthlySalary, jobType, workSetting, location, description, about, skills, information } = req.body;
    const jobId = req.params.id;

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                status: 'FAILED',
                message: 'Job not found.'
            });
        }

        // Update job details
        job.companyName = companyName;
        job.logo = logo;
        job.jobPosition = jobPosition;
        job.monthlySalary = monthlySalary;
        job.jobType = jobType;
        job.workSetting = workSetting;
        job.location = location;
        job.description = description;
        job.about = about;
        job.skills = typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : skills;
        job.information = information;

        await job.save();

        return res.json({
            status: 'SUCCESS',
            message: 'Job post updated successfully.'
        });
    } catch (error) {
        errorHandler(res, error);
    }
});

router.get('/alljobs', async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.status(200).json(jobs);
    } catch (error) {
        errorHandler(res, error);
    }
});

router.get('/job-filter', async (req, res) => {
    const { jobPosition, skills } = req.query;

    try {
        let filter = {};
        if (jobPosition) {
            filter.jobPosition = jobPosition;
        }
        if (skills) {
            const skillsArray = skills.split(',').map(skill => skill.trim());
            filter.skills = { $in: skillsArray };
        }

        const jobs = await Job.find(filter);
        res.status(200).json(jobs);
    } catch (error) {
        errorHandler(res, error);
    }
});

module.exports = router;