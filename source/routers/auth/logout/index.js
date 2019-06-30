// Core
import express from 'express';

// Instruments
import { post } from './route';
import { auth } from '../../../utils';

export const router = express.Router();

router.post('/', [ auth ], post);

export { router as logout };
