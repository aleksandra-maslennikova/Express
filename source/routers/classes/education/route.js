import { logError } from '../../../utils';

export const enrollToClass = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        logError(error);
        res.status(400).json({ message: 'incorrect payload'});
    }
};

export const expelFromClass = (req, res) => {
    try {
        const data = {
            user: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
        };

        res.status(200).json({ data });
    } catch (error) {
        logError(error);
        res.status(400).json({ message: 'incorrect payload' });
    }
};

