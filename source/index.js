import express from 'express';

// Instruments
import { app } from './server';
import { getPort, logger } from './utils';

// Routers
import { users, login, logout, classes, lessons } from './routers';

const PORT = getPort();

app.use(express.json({ limit: '10kb' }));
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).json({
            message: 'some server error',
        });
    } else {
        next();
    }
});
app.use(logger);

app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/classes', classes);
app.use('/lessons', lessons);

app.listen(PORT, () => {
    //eslint-disable-next-line
    console.log(`Server API is up on port ${PORT}`);
});
