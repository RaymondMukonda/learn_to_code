const ensureAuth = (req, res, next) => {
  // Passport adds this method when sessions are enabled
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: 'Authentication required. Please log in with GitHub.'
  });
};

export default ensureAuth;