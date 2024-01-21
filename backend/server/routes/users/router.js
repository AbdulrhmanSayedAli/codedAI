import { Router } from 'express';
import getUserById from './getUserById.js';
import signup from './signup.js';
const router = Router();

// router.get('/', UserController.get, sendResponse);
router.use('/', getUserById);
router.use('/', signup);

export default router;
