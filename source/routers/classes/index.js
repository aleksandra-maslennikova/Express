// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash/route';
import { enrollToClass, expelFromClass } from './education/route';
import { auth } from '../../utils';
export const router = express.Router();

router.get('/', get);
router.post('/', [ auth ], post);

router.get('/:classHash', [ auth ], getByHash);
router.put('/:classHash', [ auth ], updateByHash);
router.delete('/:classHash', [ auth ], deleteByHash);

router.post('/enroll', [ auth ], enrollToClass);
router.post('/expel', [ auth ], expelFromClass);

export { router as classes };
