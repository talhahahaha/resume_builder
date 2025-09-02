const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  phone: String,
  linkedin: String,
  contact_email: String,
  summary: String,
  education: [{ school: String, degree: String, year: String }],
  experience: [{ company: String, role: String, duration: String }],
  skills: [String],
  projects: [{ title: String, description: String }],
  certifications: [{ name: String, issuer: String, year: String }],
  achievements: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);
