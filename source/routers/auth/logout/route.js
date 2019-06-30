export const post = (req, res) => {
    try {
        res.status(204);
    } catch (error) {
        res.status(400).json({ message: 'incorrect payload' });
    }
};
