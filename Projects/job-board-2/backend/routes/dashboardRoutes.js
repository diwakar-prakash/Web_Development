import express from "express";
import authMiddle from "../middleware/auth.js";
import Job from "../models/Job.js";

const router = express.Router();


router.get('/my-jobs', authMiddle, async(req , res) => {
    try {
        const myJobs = await Job.find({ postedBy : req.user.id });
        if(myJobs.length === 0) {
            return res.status(401).json({
                message : "Jobs not found"
            })
        }

        res.status(200).json({
            message : "The following are all the jobs",
            myJobs
        })
    }
    catch ( err ) {
        res.status(404).json({
            message : "Some error in fetching your jobs"
        })
    }
})


router.get('/stat', authMiddle, async ( req, res ) => {
    try {
        const myJobs = await Job.find({ postedBy : req.user.id });

        const fullTime = myJobs.filter(f => f.jobType === "full-time").length;
        const partTime = myJobs.filter(f => f.jobType === "part-time").length;
        const remote = myJobs.filter(f => f.jobType === "remote").length;
        const contract = myJobs.filter(f => f.jobType === "contract").length;

        res.status(200).json({
            message : "The following are the stats...",
            fullTime : fullTime,
            partTime : partTime,
            remote : remote,
            contract : contract
        })
    }
    catch ( err ) {
        res.status(404).json("Unable to fetch out the stats. Some errors came...");
    }
})

export default router;