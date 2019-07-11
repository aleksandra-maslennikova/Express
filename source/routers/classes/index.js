// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash/route';
import { enrollToClass, expelFromClass } from './education/route';
import { authenticate } from '../../utils';
export const router = express.Router();

router.get('/', get);
router.post('/', [ authenticate ], post);

router.get('/:classHash', [ authenticate ], getByHash);
router.put('/:classHash', [ authenticate ], updateByHash);
router.delete('/:classHash', [ authenticate ], deleteByHash);

router.post('/enroll', [ authenticate ], enrollToClass);
router.post('/expel', [ authenticate ], expelFromClass);

export { router as classes };
