// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash/route';
import { addVideo, deleteVideo, getVideoByHash } from './education/videos/route';
import { addKeynote, deleteKeynote, getKeynoteByHash } from './education/keynotes/route';
import { authenticate } from '../../utils';

export const router = express.Router();

router.get('/', get);
router.post('/', [ authenticate ], post);

router.get('/:lessonHash', [ authenticate ], getByHash);
router.put('/:lessonHash', [ authenticate ], updateByHash);
router.delete('/:lessonHash', [ authenticate ], deleteByHash);

router.post('/:lessonHash/videos', [ authenticate ], addVideo);
router.delete('/:lessonHash/videos', [ authenticate ], deleteVideo);
router.get('/:lessonHash/videos/:videoHash', [ authenticate ], getVideoByHash);

router.post('/:lessonHash/keynotes', [ authenticate ], addKeynote);
router.delete('/:lessonHash/keynotes', [ authenticate ], deleteKeynote);
router.get('/:lessonHash/videos/:keynoteHash', [ authenticate ], getKeynoteByHash);

export { router as lessons };
