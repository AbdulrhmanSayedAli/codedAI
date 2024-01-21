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
    // eslint-disable-next-line no-unused-vars
    const checkPoint1 = await CheckPoints.update(req.body, {
      where:
      { id: checkPointId }
    });
    const checkPoint = await CheckPoints.update({ isColse: true }, {
      where:
      { id: checkPointId }
    });
    sendResponse(res, { data: checkPoint }, StatusCodes.OK);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

export default router;
