

export const authenticate = (req, res, next) => {
    if (req.session.email) {
        next();
    } else {
        res.status(401).json({ message: 'authentication credentials are not valid' });
    }
};
