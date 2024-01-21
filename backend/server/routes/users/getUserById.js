import { Router } from 'express';
import sendResponse from '../Utils/Response.js';
import {
  StatusCodes
} from 'http-status-codes';

const router = Router();

router.get('/getById', (req, res) => {
  try {
    sendResponse(res, {
      message: 'done',
      data: {
        name: 'haha'
      }
    }, StatusCodes.OK);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

export default router;
