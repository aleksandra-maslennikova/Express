import { logError } from '../../../../utils';

export const addVideo = (req, res) => {
    try {
        res.sendStatus(204);
    } catch (error) {
        logError(error);
        res.status(400).json({ message: 'incorrect payload'});
    }
};

export const deleteVideo = (req, res) => {
    try {
        res.sendStatus(204);
    } catch (error) {
        logError(error);
        res.status(400).json({ message: 'incorrect payload' });
    }
};

export const getVideoByHash = (req, res) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        logError(error);
        res.status(400).json({ message: 'incorrect payload' });
    }
};

