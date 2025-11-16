import express from 'express';
import upload from '../middleware/upload.js';
import Job from '../models/Job.js';

import authMiddle from '../middleware/auth.js';


const router = express.Router();


// Now we are going to create some of the routes here they are : -
// 1. Post for jobs, jo hum dalenge
// 2. Get, all the jobs , jitne bhi hai
// 3. Get, the jobs that are posted by you
// 4. PUT, meaning update the job
// 5. DELETE, meaning that you delete the job.

router.post("/post", authMiddle, upload.single("logo"), async ( req , res ) => {
    try {
        const { title, company, jobType, location, salary, skills, description } = req.body;

        const job = await Job.create({
            title,
            company,
            jobType,
            location,
            salary,
            skills : skills.split(','),
            description,
            logo : req.file ? req.file.path : null,
            postedBy : req.user.id
        });

        res.status(201).json({
            message : "JOB POSTED",
            job
        });
    }
    catch ( err ) {
        res.status(404).json({
            message : "Job INFO not created"
        })
    }
})

//now hum, all the jobs ko get karenge which is the second part 

router.get('/', async ( req, res ) => {
    try {
        const jobs = await Job.find().populate("postedBy", "username email");
        res.status(200).json({
            message : "All the jobs are here",
            jobs
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Unable to fetch the Job Posts"
        })
    }
})


//now we are going to get the job by id number and find out weather the job exits or not 

router.get("/:id", async(req , res) => {
    try {
        const job = await Job.findById(req.params.id).populate("postedBy", "username email");
        if(!job) {
            res.status(404).json({
                message : "The job is not there which you are trying to find."
            })
        }
        res.status(200).json(job)
    }
    catch ( err ) {
        res.status(404).json({
            message : err.message
        })
    }
})


router.put('/:id', authMiddle, async ( req , res ) => {
    try {
        const updatedJob = await Job.findOneAndUpdate(
            {_id : req.params.id , postedBy : req.user.id},
            req.body,
            { new : true, runValidators : true}
        );
        
        if(!updatedJob) {
            return res.status(401).json({ message : "Not authorized or job not found"});
        }

        res.status(200).json({
            message : "The job has been updated.",
            updatedJob
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "The job was not updated due to some error"
        })
    }
})


// ab jo last wala hai that is going to be is the delete router

router.delete('/:id', authMiddle, async ( req, res ) => {
    try {
        const deleteJob = await Job.findOneAndDelete({
            _id : req.params.id,
            postedBy : req.user.id
        })

        if(!deleteJob) {
            return res.status(401).json({
                message : "Not authorized or job not found"
            })
        }

        res.status(200).json({ message : "JOB DELETED" });
    }
    catch ( err ) {
        res.status(404).json({
            message : "There has been some problem in deleting the job. Please try again."
        })
    }
})


export default router;