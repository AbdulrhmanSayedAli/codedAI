import { Router } from 'express';
import project from './project.js';
import checkPoint from './checkPoint/checkPoint.js';
const router = Router();

router.use('/', project);
router.use('/checkPoints', checkPoint);

export default router;
