import dg from 'debug';
import jwt from 'jsonwebtoken';

const debug = dg('router:auth');

export const login = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { password } = req.body;
        if (password === '123456') {
            const token = await jwt.sign(req.body, 'super secret');

            res.setHeader('Authorization', token);
            res.sendStatus(204);
        } else {
            res.status(401).json({ message: 'credentials are not valid' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

