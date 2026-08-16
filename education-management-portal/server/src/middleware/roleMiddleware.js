// Role Middleware

const checkRole = (...roles) => {
  return (req, res, next) => {
    // TODO: Implement role checking
    next();
  };
};

module.exports = { checkRole };
