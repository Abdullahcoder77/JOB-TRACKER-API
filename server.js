require("dotenv").config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const morgan = require('morgan');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});


    

const port = 3000;

app.use(express.json());

app.use(helmet());
app.use(limiter);
app.use(morgan("dev"));

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);


const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


  
const jobRoutes = require("./routes/jobs");
app.use("/api/jobs", jobRoutes);


//console.log(process.env.PORT);
//console.log(process.env.MONGO_URI);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});