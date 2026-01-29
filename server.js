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

app.get('/', (req, res) => {
    res.json({ status: "Running" ,message: 'Welcome to Appifolio! Manage your job applications with ease. Please visit https://appifolio.vercel.app to get started 🚀' });
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Mongo DB connected successfully ✅");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000} 🚀`);
    });
}).catch((error) => {
    console.error("Mongo DB connection failed ❌", error);
});