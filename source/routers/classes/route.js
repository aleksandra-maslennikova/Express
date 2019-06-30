export const get = (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: 'incorrect payload' });
    }
};

export const post = (req, res) => {
    try {
        const data = {};

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: 'incorrect payload' });
    }
};
