export const getByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateByHash = (req, res) => {
    try {
        const data = {
            hash: '10ba038e-48da-487b-96e8-8d3b99b6d18a',
        };

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: 'incorrect payload' });
    }
};


export const deleteByHash = (req, res) => {
    try {
        res.status(204);
    } catch (error) {
        res.status(400).json({ message: 'incorrect payload' });
    }
};
