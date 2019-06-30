export const addKeynote = (req, res) => {
    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: 'incorrect payload' });
    }
};

export const deleteKeynote = (req, res) => {
    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: 'incorrect payload' });
    }
};

export const getKeynoteByHash = (req, res) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({ message: 'incorrect payload' });
    }
};
