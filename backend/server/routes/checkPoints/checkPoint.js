import { Router } from 'express';
import sendResponse from '../Utils/Response.js';
import {
  StatusCodes
} from 'http-status-codes';
import CheckPoints from '../../models/checkPoints.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const checkPoint = await CheckPoints.create(req.body);
    sendResponse(res, { data: checkPoint }, StatusCodes.CREATED);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const checkPointId = req.params.id;
    const checkPoint = await CheckPoints.findOne({
      where:
    { id: checkPointId }
    });
    sendResponse(res, { data: checkPoint }, StatusCodes.OK);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

export default router;
