
import express from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// Instruments
import { app } from './server';
import { getPort, logger, logError, NotFoundError, validationErrorLogger, notFoundErrorLogger } from './utils';

// Routers
import { users, auth, classes, lessons } from './routers';

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromHeader('x-token');
jwtOptions.secretOrKey = 'super secret';

passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, done) {

    if (jwt_payload) {
        return done(null, jwt_payload);
    }

    return done(null, false);
}));


const PORT = getPort();

app.use(express.json({ limit: '10kb' }));

// Initialize strategy
app.use(passport.initialize());

// Initialize session
app.use(passport.session());

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
