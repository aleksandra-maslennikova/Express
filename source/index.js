
import express from 'express';
import session from 'express-session';

// Instruments
import { app } from './server';
import { getPort, logger, logError, NotFoundError, validationErrorLogger, notFoundErrorLogger } from './utils';

// Routers
import { users, auth, classes, lessons } from './routers';

const PORT = getPort();

const sessionOptions = {
    key:               'user',
    secret:            'pa$$w0rd',
    resave:            false,
    rolling:           true,
    saveUninitialized: false,
    cookie:            {
        httpOnly: true,
        maxAge:   15 * 60 * 1000,
    },
};

app.use(express.json({ limit: '10kb' }));

app.use(express.json());
app.use(session(sessionOptions));

if (process.env.NODE_ENV !== 'production') {
    app.use(logger);
}

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/classes', classes);
app.use('/api/lessons', lessons);

app.use('*', (req, res, next) => {
    const message = `${req.method}: ${req.originalUrl}`;
    next(new NotFoundError(message, 404));
});

app.use((error, req, res, next) => {
    if (error) {
        switch (error.name) {
            case 'NotFoundError': {
                notFoundErrorLogger.error(error.message);

                return res.status(error.statusCode).json({
                    message: error.message,
                });
            }
            case 'ValidationError': {
                const message = `${req.method}: ${req.originalUrl} [${error.message}]`;
                validationErrorLogger.error(message);

                return res.status(error.statusCode).json({
                    message: error.message,
                });
            }
            default: {
                logError(error);
                res.status(500).json({
                    message: 'some server error',
                });
            }
        }
    } else {
        next();
    }
});

app.listen(PORT, () => {
    //eslint-disable-next-line
  console.log(`Server API is up on port ${PORT}`);
});
