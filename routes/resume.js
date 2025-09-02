// ...existing code...
const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error', 'You must be logged in.');
  res.redirect('/login');
}

router.get('/dashboard', isLoggedIn, resumeController.getDashboard);
router.get('/resume', isLoggedIn, resumeController.getResumeForm);
router.post('/resume', isLoggedIn, resumeController.createOrUpdateResume);
router.get('/resume/:id/edit', isLoggedIn, resumeController.getEditResumeForm);
router.post('/resume/:id', isLoggedIn, resumeController.updateResume);

const pdfController = require('../controllers/pdfController');

router.get('/resume/:id/download', isLoggedIn, pdfController.downloadResumePDF);

module.exports = router;
