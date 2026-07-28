import express from 'express';
import passport from 'passport';

const router = express.Router();

// Start GitHub login
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub callback
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login-failed',
    session: true
  }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

// Current logged-in user
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'Not authenticated'
    });
  }

  res.status(200).json({
    message: 'Authenticated',
    user: req.user
  });
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy(() => {
      res.status(200).json({
        message: 'Logged out successfully'
      });
    });
  });
});

// Login failed
router.get('/login-failed', (req, res) => {
  res.status(401).json({
    message: 'GitHub login failed'
  });
});

export default router;