// import User from './../../models/user.js';
import { Router } from 'express';
import sendResponse from '../Utils/Response.js';
import {
  StatusCodes
} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const secretKey = 'SDFR25D';
    // const hasedPassword = jwt.sign(password, secretKey);
    const hashedPassword = await bcrypt.hash(password, 10);

    // const token = jwt.sign({ username, password }, secretKey);
    const token = jwt.sign({ username, password }, secretKey);
    sendResponse(res, {
      message: 'done',
      data: {
        password: hashedPassword,
        token
      }
    }, StatusCodes.OK);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

export default router;
