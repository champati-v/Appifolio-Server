const Application = require('../models/Application')

//GET all applications
exports.getApplications = async (req, res) => {
    try {
        const apps = await Application.find({userId: req.query.userId});
        res.json(apps);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error });
    }
}

//POST new application
exports.createApplication = async (req, res) => {
    try {
        const newApp = new Application(req.body);
        const savedApp = await newApp.save();
        res.status(201).json(savedApp);
    } catch (error) {
        res.status(500).json({ message: 'Error creating application', error });
    }
}

//PUT update application
exports.updateApplication = async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message }); 
  }
};

// DELETE application
exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};