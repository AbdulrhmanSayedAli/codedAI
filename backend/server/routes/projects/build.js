import { Router } from 'express'
import sendResponse from '../Utils/Response.js'
import {
  StatusCodes
} from 'http-status-codes'

const router = Router()

router.get('/build', (req, res) => {
  sendResponse(res, { message: 'hi' }, StatusCodes.OK)
})

export default router
