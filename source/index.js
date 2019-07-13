
import express from 'express';
import passport from 'passport';
import path from 'path';
import { Strategy as GitHubStrategy } from 'passport-github2';

// Instruments
import { app } from './server';
import { getPort, logger, logError, NotFoundError, validationErrorLogger, notFoundErrorLogger } from './utils';

// Routers
import { users, auth, classes, lessons } from './routers';

const GITHUB_CLIENT_ID = '2f76a92ce4760bd2fe2e';
const GITHUB_CLIENT_SECRET = '5f6aa2d53a282b9409b8c638ad451de93e18e769';


passport.use(new GitHubStrategy({
    clientID:     GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL:  'http://127.0.0.1:3000/api/auth/users',
},
function (accessToken, refreshToken, profile, done) {
    if (profile) {
        return done(null, profile);
    }

    return done(null, false);
}));
passport.serializeUser(function (user, done) {

    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


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

app.get('/', (req, res) => {
    const file = path.resolve('index.html');
    res.sendFile(file);
});

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
