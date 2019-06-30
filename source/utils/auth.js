// Core

export const auth = (req, res, next) => {
    if (req.headers.authorization === `Bearer ${process.env.PASSWORD}`) {
        next();
    } else {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
