const Job = require("../models/job");
const getJobStats = async (req, res) => {
    try {
        const stats = await Job.aggregate([
            {
                 $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = stats.reduce((sum, item) => {
            return sum + item.count;
        }, 0);

        const applied =
            stats.find(item => item._id === "Applied")?.count || 0;

        const interview =
            stats.find(item => item._id === "Interview")?.count || 0;

        const rejected =
            stats.find(item => item._id === "Rejected")?.count || 0;

        const offered =
            stats.find(item => item._id === "Offered")?.count || 0;

        
        res.status(200).json({
            total,
            applied,
            interview,
            rejected,
            offered
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getAllJobs = async (req, res) => {
    try {         
        
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || "latest";
        const status = req.query.status || "all";




        const search = (req.query.search ||"").trim();
        if (search.length > 100) {
    return res.status(400).json({
        message: "Search query too long"
    });
}
 const filter = { userId: req.user };
        if (search) {
            filter.$or = [
                { position: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } }
            ];
        }


        

const allowedStatuses = [
    " Applied", "Interview", "Rejected", "Offered"
];


if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
        message: "Invalid status"
    });
}

        if(page < 1){
            return res.status(400).json({ message: "Page number must be greater than 0" });
        }
        if (limit < 1 || limit > 100) {
            return res.status(400).json({ message: "Limit must be between 1 and 100" });
        }
        const skip = (page - 1) * limit;
       
        if (status!== "all") {
            filter.status = status;
        }

        let sortOption = {};
        
        if (sort !== "latest" &&  sort !== "oldest" ) {
    return res.status(400).json({
        message: "Invalid sort option"
    });
}
        if (sort === "latest") {
            sortOption = { createdAt: -1 };
        } else if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        }
        


        const paginatedJobs = await Job.find(filter).skip(skip).limit(limit).sort(sortOption);
        const totalJobs = await Job.countDocuments(filter);
        const totalPages = Math.ceil(totalJobs / limit);
        res.status(200).json({ jobs: paginatedJobs, totalPages, totalJobs });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getJobByID = async (req,res)=> {
    try{
        const job = await Job.findOne({ _id: req.params.id, userId: req.user });
            if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }
             res.status(201).json({ job });        
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
    }
const createJob = async (req, res) => {
    try {
       const job = await Job.create({
    ...req.body,
    userId: req.user
});

        res.status(201).json({ job });

    } catch (error) {

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
};
const delJob = async (req,res) => {
    try{
        const job = await Job.findOneAndDelete({_id :req.params.id,
            userId :req.user  });
        if(!job){
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const { userId, ...updateData } = req.body;
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, userId: req.user },
            updateData,
            { new: true, runValidators: true }
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        if(error.name === "ValidationError"){
            return res.status(400).json({
                message: error.message
            });
        }
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    createJob,
    getAllJobs,
    delJob, 
    updateJob,
    getJobByID,
    getJobStats

};