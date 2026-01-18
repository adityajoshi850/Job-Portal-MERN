const { Job, User } = require("../model")



const createJob = async (req, res) => {
    const { jobTitle, jobDescription, jobLocation, jobSalary, jobCompany } = req.body
    const userId = req.user.id
    if (!jobTitle || !jobDescription || !jobLocation || !jobSalary || !jobCompany) {
        return res.status(400).json({ message: "All fields are required" })
    }
    await Job.create({
        jobTitle,
        jobDescription,
        jobLocation,
        jobSalary,
        jobCompany,
        userId
    })

    res.status(201).json({
        message: "job created successfully",
    })
}
// get all jobs

const getAllJobs = async (req, res) => {

    const jobs = await Job.findAll({
        include: {
            model: User,
            attributes: ["id", "username", "userEmail"]
        }
    });

    if (jobs.length === 0) {
        return res.status(400).json({
            message: "No jobs available"
        })
    }
    res.status(200).json({
        data: jobs
    })

    res.status(500).json({
        message: "Server error",
        error: error.message
    })
}

const updateJob = async (req, res) => {
    const { id } = req.params;

    const job = await Job.findByPk(id);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    if (job.userId !== req.user.id) {
        return res.status(403).json({ message: "You can only update your own jobs" });
    }

    const { jobTitle, jobDescription, jobLocation, jobSalary, jobCompany } = req.body;

    await job.update({
        jobTitle: jobTitle ?? job.jobTitle,
        jobDescription: jobDescription ?? job.jobDescription,
        jobLocation: jobLocation ?? job.jobLocation,
        jobSalary: jobSalary ?? job.jobSalary,
        jobCompany: jobCompany ?? job.jobCompany,
    });

    return res.status(200).json({
        message: "Job updated successfully",
        data: job,
    });
};

const deleteJob = async (req, res) => {
    const { id } = req.params;

    const job = await Job.findByPk(id);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    if (job.userId !== req.user.id) {
        return res.status(403).json({ message: "You can only delete your own jobs" });
    }

    await job.destroy();

    return res.status(200).json({
        message: "Job deleted successfully",
    });
};



module.exports = {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob
}