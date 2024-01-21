import { Router } from 'express';
import sendResponse from '../../Utils/Response.js';
import {
  StatusCodes
} from 'http-status-codes';
import CheckPoints from '../../../models/checkPoints.js';

const router = Router();

router.get('/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const checkPoint = await CheckPoints.findAll({ where: { projectId } });

    sendResponse(res, { data: checkPoint }, StatusCodes.OK);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

export default router;
