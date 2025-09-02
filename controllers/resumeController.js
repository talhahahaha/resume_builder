exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume || resume.user.toString() !== req.user._id.toString()) {
      req.flash('error', 'Resume not found or access denied.');
      return res.redirect('/dashboard');
    }
    await Resume.findByIdAndDelete(req.params.id);
    req.flash('success', 'Resume version deleted.');
    res.redirect('/dashboard');
  } catch (err) {
    req.flash('error', 'Error deleting resume.');
    res.redirect('/dashboard');
  }
};
const Resume = require('../models/Resume');
const Joi = require('joi');

const resumeSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().allow(''),
  linkedin: Joi.string().allow(''),
  contact_email: Joi.string().email().allow(''),
  summary: Joi.string().allow(''),
  education: Joi.array().items(Joi.object({ school: Joi.string(), degree: Joi.string(), year: Joi.string() })),
  experience: Joi.array().items(Joi.object({ company: Joi.string(), role: Joi.string(), duration: Joi.string() })),
  skills: Joi.array().items(Joi.string()),
  projects: Joi.array().items(Joi.object({ title: Joi.string(), description: Joi.string() })),
  certifications: Joi.array().items(Joi.object({ name: Joi.string(), issuer: Joi.string(), year: Joi.string() })),
  achievements: Joi.array().items(Joi.string())
});

exports.getResumeForm = async (req, res) => {
  // Get latest resume for user
  const resume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  res.render('resume', { title: 'Resume Builder', resume });
};

exports.createOrUpdateResume = async (req, res) => {
  const { error } = resumeSchema.validate(req.body);
  if (error) {
    req.flash('error', error.details[0].message);
    return res.redirect('/resume');
  }
  try {
    // Save as new version
    const resume = new Resume({ ...req.body, user: req.user._id });
    await resume.save();
    req.flash('success', 'Resume saved!');
    res.redirect('/dashboard');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/resume');
  }
};

exports.getEditResumeForm = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  if (!resume || resume.user.toString() !== req.user._id.toString()) {
    req.flash('error', 'Resume not found or access denied.');
    return res.redirect('/dashboard');
  }
  res.render('resume', { title: 'Edit Resume', resume });
};

exports.updateResume = async (req, res) => {
  const { error } = resumeSchema.validate(req.body);
  if (error) {
    req.flash('error', error.details[0].message);
    return res.redirect(`/resume/${req.params.id}/edit`);
  }
  try {
    // Save as new version
    const resume = new Resume({ ...req.body, user: req.user._id });
    await resume.save();
    req.flash('success', 'Resume updated and new version created!');
    res.redirect('/dashboard');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect(`/resume/${req.params.id}/edit`);
  }
};

exports.getDashboard = async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.render('dashboard', { title: 'Dashboard', resumes });
};
