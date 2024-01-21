import UserRouter from './users/router.js';
import projectRouter from './projects/router.js';
import { Router } from 'express';
import CheckPoints from './checkPoints/router.js';
const router = Router();

router.use('/user', UserRouter);
router.use('/project', projectRouter);
router.use('/checkPoint', CheckPoints);

export default router;
