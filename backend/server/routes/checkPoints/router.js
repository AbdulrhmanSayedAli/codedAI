import { Router } from 'express';
import checkPoint from './checkPoint.js';
import saveCheckPoint from './saveCheckPoint/saveCheckPoint.js';
import endCheckPoint from './endCheckPoint/endCheckPoint.js';
const router = Router();

router.use('/', checkPoint);
router.use('/saveCheckPoint', saveCheckPoint);
router.use('/endCheckPoint', endCheckPoint);

export default router;
