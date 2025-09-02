const Resume = require('../models/Resume');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');

exports.downloadResumePDF = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate('user');
    if (!resume || resume.user._id.toString() !== req.user._id.toString()) {
      req.flash('error', 'Resume not found or access denied.');
      return res.redirect('/dashboard');
    }
    const html = await ejs.renderFile(path.join(__dirname, '../views/pdf_resume.ejs'), { resume });
    pdf.create(html).toStream((err, stream) => {
      if (err) {
        req.flash('error', 'PDF generation failed.');
        return res.redirect('/dashboard');
      }
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      stream.pipe(res);
    });
  } catch (err) {
    req.flash('error', 'Error downloading PDF.');
    res.redirect('/dashboard');
  }
};