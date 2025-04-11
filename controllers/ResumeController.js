import Resume from "../models/Resume.js";


// create resume controller
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      user: req.user,
      title: req.body.title || 'Untitled Resume',
      data: req.body.data || {},
      template: req.body.template || 'default',
      sectionsOrder: req.body.sectionsOrder || [],
    });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all resumes for a user
export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single resume
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user });
    if (!resume) {
        return res.status(404).json({
         message: 'Resume not found'
         });
    }     
    res.json(resume);
  } catch (err) {
    res.status(500).json({
         error: err.message
         });
  }
};

// UPDATE resume
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { $set: req.body },
      { new: true }
    );
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE resume
export const deleteResume = async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.json({ msg: 'Deleted', id: deleted._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


