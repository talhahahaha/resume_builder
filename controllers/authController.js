const passport = require('passport');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email });
    await User.register(user, password);
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/login');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/register');
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.flash('error', info.message || 'Invalid credentials');
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
  req.flash('success', 'Welcome back!');
  return res.redirect('/resume');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    req.flash('success', 'Logged out successfully.');
    res.redirect('/');
  });
};
