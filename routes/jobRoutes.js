const { createJob, getAllJobs, updateJob, deleteJob } = require('../controller/jobController');
const { isAuthenticated, checkUserRole } = require('../middlewares/userMiddleware');
const { asyncError } = require('../services/asyncErrro');

const router = require('express').Router();

// CREATE
router.post("/job", isAuthenticated, checkUserRole("jobProvider"), asyncError(createJob));

// READ
router.get("/jobs", asyncError(getAllJobs));

// UPDATE  
router.patch("/job/:id", isAuthenticated, checkUserRole("jobProvider"), asyncError(updateJob));

// DELETE  
router.delete("/job/:id", isAuthenticated, checkUserRole("jobProvider"), asyncError(deleteJob));

module.exports = router;
