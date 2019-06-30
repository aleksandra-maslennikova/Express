// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, deleteByHash } from './hash/route';
import { addVideo, deleteVideo, getVideoByHash } from './education/videos/route';
import { addKeynote, deleteKeynote, getKeynoteByHash } from './education/keynotes/route';
import { auth } from '../../utils';

export const router = express.Router();

router.get('/', get);
router.post('/', [ auth ], post);

router.get('/:lessonHash', [ auth ], getByHash);
router.put('/:lessonHash', [ auth ], updateByHash);
router.delete('/:lessonHash', [ auth ], deleteByHash);

router.post('/:lessonHash/videos', [ auth ], addVideo);
router.delete('/:lessonHash/videos', [ auth ], deleteVideo);
router.get('/:lessonHash/videos/:videoHash', [ auth ], getVideoByHash);

router.post('/:lessonHash/keynotes', [ auth ], addKeynote);
router.delete('/:lessonHash/keynotes', [ auth ], deleteKeynote);
router.get('/:lessonHash/videos/:keynoteHash', [ auth ], getKeynoteByHash);

export { router as lessons };
