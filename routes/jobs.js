const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { getAllJobs, createJob,delJob,updateJob, getJobByID, getJobStats } = require("../controllers/jobController");
router.get("/", authMiddleware, getAllJobs);
router.post("/",  authMiddleware, createJob);
router.get("/:stats", authMiddleware, getJobStats);

router.get("/:id", authMiddleware, getJobByID);
router.delete("/:id",authMiddleware, delJob);
router.put("/:id",authMiddleware, updateJob);



module.exports = router;