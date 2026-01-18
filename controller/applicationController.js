const Application = require("../model/ApplicatinModel");
const Job = require("../model/JobModel");
const User = require("../model/UserModel");

const jobApply = async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user.id;


    if (String(req.user.userRole).toLowerCase() === "jobprovider") {
        return res.status(400).json({
            message: "Only job seeker can apply for job",
        });
    }

    if (!jobId) {
        return res.status(400).json({ message: "jobId is required" });
    }


    const job = await Job.findByPk(jobId);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }


    const existing = await Application.findOne({
        where: { jobId, userId },
    });

    if (existing) {
        return res.status(400).json({
            message: "You have already applied for this job",
        });
    }

    const application = await Application.create({
        jobId,
        userId,

    });

    return res.status(201).json({
        message: "Job applied successfully",
        application,
    });
};

const getApplications = async (req, res) => {
    const applications = await Application.findAll({

        order: [["createdAt", "DESC"]],
    });

    if (applications.length === 0) {
        return res.status(404).json({
            message: "No applications found",
        });
    }

    return res.status(200).json({
        message: "Applications fetched successfully",
        applications,
    });
};

const updateApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "status is required" });
    }

    // allowed enum values check (matches your model)
    const allowed = ["applied", "accepted", "rejected"];
    if (!allowed.includes(String(status).toLowerCase())) {
        return res.status(400).json({
            message: `Invalid status. Use: ${allowed.join(", ")}`,
        });
    }

    const application = await Application.findByPk(id);
    if (!application) {
        return res.status(404).json({
            message: "Application not found",
        });
    }

    const [count, updatedRows] = await Application.update(
        { status: String(status).toLowerCase() },
        { where: { id }, returning: true }
    );

    return res.status(200).json({
        message: "Application status updated successfully",
        updatedApplication: updatedRows?.[0] || null,
    });
};

const deleteApplication = async (req, res) => {

    const { id } = req.params;

    const application = await Application.findByPk(id);
    if (!application) {
        return res.status(404).json({
            message: "Application not found",
        });
    }

    await Application.destroy({ where: { id } });

    return res.status(200).json({
        message: "Application deleted successfully",
    });
};

const myApplications = async (req, res) => {
    const userId = req.user.id;

    const applications = await Application.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
        message: "My applications fetched successfully",
        applications,
    });
};

module.exports = {
    jobApply,
    updateApplicationStatus,
    deleteApplication,
    getApplications,
    myApplications,
};
