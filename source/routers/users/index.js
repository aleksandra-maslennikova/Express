// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash/route';
import { limiter, validator, auth } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();

router.get('/', [ limiter(5, 60 * 1000), auth ], get);
router.post('/', [ validator(createUser) ], post);

router.get('/:userHash', [ auth ], getByHash);
router.put('/:userHash',  [ auth ], updateByHash);
router.delete('/:userHash', [ auth ], deleteByHash);

export { router as users };
