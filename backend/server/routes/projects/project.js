import { Router } from 'express';
import sendResponse from '../Utils/Response.js';
import Project from '../../models/project.js';
import {
  StatusCodes
} from 'http-status-codes';
import CheckPoints from '../../models/checkPoints.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const project = await Project.create(
      req.body
    );
    const checkPoint = await CheckPoints.create(
      { name: 'first check point' }
    );
    sendResponse(res, { data: { project, checkPoint } }, StatusCodes.CREATED);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

router.delete('/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.destroy(
      { where: { id: projectId } }
    );

    sendResponse(res, { data: project }, StatusCodes.OK);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

router.patch('/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const update = await Project.update(req.body, {
      where: {
        id: projectId
      }
    });
    sendResponse(res, { data: update }, StatusCodes.OK);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

export default router;
