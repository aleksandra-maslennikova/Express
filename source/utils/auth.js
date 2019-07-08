
// Instruments
import { getPassword } from './env';

const password = getPassword();

export const auth = (req, res, next) => {
    const auth = req.header('authorization');

    if (auth && auth === password) {
        next();
    } else {
        res.status(401).json({ message: 'authentication credentials are not valid' });
    }
};