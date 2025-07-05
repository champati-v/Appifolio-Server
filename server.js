const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Mongo DB connected successfully ✅");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000} 🚀`);
    });
}).catch((error) => {
    console.error("Mongo DB connection failed ❌", error);
});