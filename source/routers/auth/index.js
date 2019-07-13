// Core
import express from 'express';
import passport from 'passport';

// Instruments
import { login, logout, github } from './route';
import { limiter, authenticate } from '../../utils';

export const router = express.Router();

router.post('/login', [ limiter(5, 60 * 1000) ], login);
router.post('/logout', [ authenticate, limiter(5, 60 * 1000) ], logout);
router.get('/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/api/auth/login' }),
    github);

export { router as auth };
