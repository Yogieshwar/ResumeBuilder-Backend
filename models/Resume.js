import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, default: 'Untitled Resume' },
  data: {
    personalInfo: {
      name: String,
      email: String,
      phone: String,
      address: String,
      profilePic: String,
      linkedinUrl:String,
    },
    summary: String,
    skills: [String],
    education: [
      {
        school: String,
        degree: String,
        year: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        year: String,
        description: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        tech: [String],
      },
    ],
   
  },
  template: { type: String, default: 'default' },
  sectionsOrder: [String], 
}, { timestamps: true });
const Resume=mongoose.model('Resume', resumeSchema);
export default Resume;