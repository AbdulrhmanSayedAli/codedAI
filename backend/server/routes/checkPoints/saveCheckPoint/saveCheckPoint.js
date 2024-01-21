import { Router } from 'express';
import sendResponse from '../../Utils/Response.js';
import {
  StatusCodes
} from 'http-status-codes';
import CheckPoints from '../../../models/checkPoints.js';

const router = Router();

router.patch('/:id', async (req, res) => {
  try {
    const checkPointId = req.params.id;
    const checkPoint = await CheckPoints.update(req.body, {
      where:
      { id: checkPointId }
    });
    sendResponse(res, { data: checkPoint }, StatusCodes.OK);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

export default router;
