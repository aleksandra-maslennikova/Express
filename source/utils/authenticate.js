

export const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/auth/login');
};
