import { Router } from 'express';
import build from './build.js';
const router = Router();

router.use('/', build);

export default router;
